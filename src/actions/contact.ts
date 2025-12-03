import { nullToEmptyString } from "@/utils";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contact = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.preprocess(
        nullToEmptyString,
        z.string().min(1, { message: "El nombre es obligatorio" })
      ),
      email: z.preprocess(
        nullToEmptyString,
        z
          .string()
          .min(1, { message: "El correo es obligatorio" })
          .email({ message: "El correo no es válido" })
      ),
      subject: z.preprocess(
        nullToEmptyString,
        z.string().min(1, { message: "El asunt es obligatorio" })
      ),
      message: z.preprocess(
        nullToEmptyString,
        z
          .string()
          .min(15, { message: "El mensaje es obligatorio o es muy corto" })
      ),
    }),
    handler: async (input) => {
      const url = `${
        import.meta.env.HOME_URL
      }/wp-json/contact-form-7/v1/contact-forms/142/feedback`;

      const formData = new FormData();
      formData.append("your-name", input.name);
      formData.append("your-email", input.email);
      formData.append("your-subject", input.subject);
      formData.append("your-message", input.message);
      formData.append("_wpcf7_unit_tag", "wpcf709");

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      await res.json();

      return {
        error: false,
        message: "Tu mensaje se ha enviado correctamente.",
      };
    },
  }),
};
