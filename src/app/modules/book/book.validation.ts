import { z } from "zod";

const create = z.object({
  title: z.string(),
  genre: z.string(),
  publishedYear: z.number().int().min(0),
  totalCopies: z.number().int().min(0),
  availableCopies: z.number().int().min(0),
});

const update = z
  .object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishedYear: z.number().int().min(0).optional(),
    totalCopies: z.number().int().min(0).optional(),
    availableCopies: z.number().int().min(0).optional(),
  })
  .strict();

const bookValidationSchema = {
  create,
  update,
};

export default bookValidationSchema;
