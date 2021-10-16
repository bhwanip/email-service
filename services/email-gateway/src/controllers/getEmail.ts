import { Models } from "@email-service/commons";

export async function getEmail(req: any, res: any) {
  const { id: emailId } = req.params;

  console.log("=======>", emailId);

  const email = await Models.Email.findByPk(emailId);

  if (!email) {
    return res.status(404).json({ errors: "Email not found." });
  }

  return res.json(email);
}
