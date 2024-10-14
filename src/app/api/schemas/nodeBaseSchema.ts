import { z } from "zod";

const XYPosition = z.object({
  x: z.number(),
  y: z.number(),
});

const Data = z.object({
  label: z.string(),
});

const NodeType = z.enum(["input", "default", "output"])

export const NodeBaseSchema = z.object({
  id: z.string(),
  position: XYPosition,
  data: Data,
  type: NodeType.optional(),
});
