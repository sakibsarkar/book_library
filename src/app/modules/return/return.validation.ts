import { z } from "zod";

export const returnValidationSchema = z.object({ borrowId: z.string() });
