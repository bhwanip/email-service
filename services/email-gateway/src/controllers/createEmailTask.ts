import { body, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import { Models } from "@email-service/commons";
import { sendMessage } from "../aws";

const emailsListValidator = (value: string, {}: { req: any }) => {
  const trimedValue = value?.trim();
  //ignore empty input
  if (!trimedValue?.length) return true;

  if (/\s/.test(trimedValue)) {
    throw new Error(`White space not allowed in emails list.`);
  }

  const invalidEmails = new Array<string>();

  trimedValue.split(";").forEach((val) => {
    if (!validator.isEmail(val.trim())) {
      invalidEmails.push(`'${val}'`);
    }
  });

  if (invalidEmails.length) {
    throw new Error(`Invalid emails in the list: ${invalidEmails.join(",")}.`);
  }

  return true;
};

export function validate(action: string) {
  switch (action) {
    case "submitEmail": {
      return [
        body("from")
          .notEmpty()
          .withMessage("From email is required.")
          .isEmail()
          .withMessage("Invalid from email."),
        body("to")
          .notEmpty()
          .withMessage("To email is required.")
          .custom(emailsListValidator),
        body("cc").custom(emailsListValidator),
        body("bcc").custom(emailsListValidator),
        body("body").notEmpty().withMessage("Email body is required."),
      ];
    }
  }
}

export async function createEmailTask(req: any, res: any) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
    return;
  }

  const { id } = await Models.Email.create({
    id: uuidv4(),
    from: "puneet11.dce@gmail.com",
    to: req.body.to.trim(),
    cc: req.body.cc?.trim(),
    bcc: req.body.bcc?.trim(),
    subject: req.body.subject?.trim(),
    body: req.body.body?.trim(),
    status: Models.EmailStatus.ACCEPTED,
    payload: req.body,
  });

  sendMessage({
    id,
    ...req.body,
  });

  res.status(202).json({ id });
}
