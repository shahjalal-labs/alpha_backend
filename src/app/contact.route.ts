import express, { type Request, type Response } from "express";
import { formHtml } from "../services/formHtml.js";
import { inquieryFormHtml } from "../services/inquieryFormHtml.js";
import { messageFormHtml } from "../services/messageFormHtml.js";
import { opinionHtml } from "../services/opinionHtml.js";
import sendFormInfo from "../services/sendFormInfo.js";
import { thirdMessageFormHtml } from "../services/thirdMessageFormHtml.js";
import { verifyTurnstile } from "../services/verifyTurnstile.js";

export const contactRouter = express.Router();

contactRouter.post("/send-info", async (req: Request, res: Response) => {
  try {
    const {
      turnstileToken,
      ...payload
    } = req.body;

    // Turnstile validation
    const isHuman = await verifyTurnstile(
      turnstileToken,
      req.ip,
    );

    if (!isHuman) {
      return res.status(403).json({
        success: false,
        message:
          "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      });
    }

    const emailSubject = "New Form Submission";
    const emailHtml = formHtml(payload);

    await sendFormInfo(
      "info@uenal-immobilien.de",
      emailSubject,
      emailHtml,
    );

    return res.json({
      success: true,
      message:
        "Formularinformationen wurden erfolgreich gesendet.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error";

    console.error(
      "Failed to process /send-info",
      message,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send form information.",
    });
  }
});


contactRouter.post("/send-inquiry", async (req: Request, res: Response) => {
  try {
    const {
      turnstileToken,
      ...payload
    } = req.body;

    // Turnstile validation
    const isHuman = await verifyTurnstile(
      turnstileToken,
      req.ip,
    );

    if (!isHuman) {
      return res.status(403).json({
        success: false,
        message:
          "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      });
    }

    const emailSubject = "New Form Submission";
    const emailHtml = inquieryFormHtml(payload);

    await sendFormInfo(
      "info@uenal-immobilien.de",
      emailSubject,
      emailHtml,
    );

    return res.json({
      success: true,
      message:
        "Formularinformationen wurden erfolgreich gesendet.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error";

    console.error(
      "Failed to process /send-inquiry",
      message,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send form information.",
    });
  }
});


contactRouter.post("/send-message", async (req: Request, res: Response) => {
  try {
    const {
      turnstileToken,
      ...payload
    } = req.body;

    // Turnstile validation
    const isHuman = await verifyTurnstile(
      turnstileToken,
      req.ip,
    );

    if (!isHuman) {
      return res.status(403).json({
        success: false,
        message:
          "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      });
    }

    const emailSubject = "New Form Submission";
    const emailHtml = messageFormHtml(payload);

    await sendFormInfo(
      "info@uenal-immobilien.de",
      emailSubject,
      emailHtml,
    );

    return res.json({
      success: true,
      message:
        "Formularinformationen wurden erfolgreich gesendet.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error";

    console.error(
      "Failed to process /send-message",
      message,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send form information.",
    });
  }
});


// third website route

contactRouter.post(
  "/alpa-third/send-message",
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        phone,
        typeOfReport,
        message,
        turnstileToken,
      } = req.body;

      // Basic validation
      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          message: "Bitte füllen Sie alle Pflichtfelder aus.",
        });
      }

      // Turnstile validation
      const isHuman = await verifyTurnstile(
        turnstileToken,
        req.ip,
      );

      if (!isHuman) {
        return res.status(403).json({
          message:
            "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        });
      }

      const payload = {
        name,
        email,
        phone,
        typeOfReport,
        message,
      };

      const emailSubject = "New Form Submission";
      const emailHtml = thirdMessageFormHtml(payload);

      await sendFormInfo(
        "info@uenal-immobilien.de",
        emailSubject,
        emailHtml,
      );

      return res.json({
        success: true,
        message:
          "Formularinformationen wurden erfolgreich gesendet.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unexpected server error";

      console.error(
        "Failed to process /alpa-third/send-message",
        errorMessage,
      );

      return res.status(500).json({
        success: false,
        message: "Failed to send form information.",
      });
    }
  },
);

// third website route
contactRouter.post(
  "/alpa-third/send-opinion",
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        phone,
        typeOfReport,
        message,
        turnstileToken,
      } = req.body;

      // Basic validation
      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          message: "Bitte füllen Sie alle Pflichtfelder aus.",
        });
      }

      // Turnstile validation
      const isHuman = await verifyTurnstile(
        turnstileToken,
        req.ip,
      );

      if (!isHuman) {
        return res.status(403).json({
          message:
            "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        });
      }

      const payload = {
        name,
        email,
        phone,
        typeOfReport,
        message,
      };

      const emailSubject = "New Form Submission";
      const emailHtml = opinionHtml(payload);

      await sendFormInfo(
        "info@uenal-immobilien.de",
        emailSubject,
        emailHtml,
      );

      return res.json({
        success: true,
        message: "Formularinformationen wurden erfolgreich gesendet.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unexpected server error";

      console.error(
        "Failed to process /alpa-third/send-opinion",
        message,
      );

      return res.status(500).json({
        success: false,
        message: "Failed to send form information.",
      });
    }
  },
);
