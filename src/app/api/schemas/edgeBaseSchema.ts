import { z } from "zod";

export const EdgeBaseSchema = z
  .object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
  });
