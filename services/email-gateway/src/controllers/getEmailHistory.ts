import { Models } from "@email-service/commons";

export async function getEmailHistory(req: any, res: any) {
  const { id: emailId } = req.params;

  const emailHistory = await Models.EmailHistory.findAll({
    where: { emailId },
  });

  if (!emailHistory) {
    return res.status(404).json({ errors: "Email not found." });
  }

  return res.json(emailHistory);
}
