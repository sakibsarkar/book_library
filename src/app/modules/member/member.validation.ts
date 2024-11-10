import { z } from "zod";

const create = z
  .object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    membershipDate: z.string().datetime(),
  })
  .strict();
const update = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    membershipDate: z.string().datetime().optional(),
  })
  .strict();

const memberValidationSchema = {
  create,
  update,
};

export default memberValidationSchema;
