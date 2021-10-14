import express from "express";
import * as emailController from "../controllers";

export const router = express.Router();

router.post(
  "/submitEmail",
  emailController.validate("submitEmail"),
  emailController.createEmailTask
);

router.get("/email/:id", emailController.getEmail);

router.get("/email/:id/history", emailController.getEmailHistory);
