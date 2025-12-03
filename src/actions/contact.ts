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
        z.string().min(15, { message: "El mensaje es obligatorio o es muy corto" })
      ),
    }),
    handler: (input) => {
      console.log(input);
    },
  }),
};
