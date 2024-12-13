import { z } from "zod";

const MIN_NAME = 2;
const MAX_NAME = 48;
const MIN_DESC = 2;
const MAX_DESC = 96;

export const addServerFormSchema = z.object({
  name: z
    .string()
    .min(MIN_NAME, {
      message: `Name must be at least ${MIN_NAME} characters`,
    })
    .max(48, {
      message: `Name can only be ${MAX_NAME} characters long`,
    }),
  domain: z.string().url(),
  description: z
    .string()
    .min(2, {
      message: `Description must be at least ${MIN_DESC} characters`,
    })
    .max(96, {
      message: `Description can only be ${MAX_DESC} characters long`,
    }),
  isPaid: z.boolean().default(false),
  hasWhitelist: z.boolean().default(false),
});
