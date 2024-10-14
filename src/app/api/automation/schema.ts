import { z } from "zod";
import { EdgeBaseSchema } from "../schemas/edgeBaseSchema";
import { NodeBaseSchema } from "../schemas/nodeBaseSchema";

export const PUTRequestSchema = z.object({
  edges: z.array(EdgeBaseSchema),
  nodes: z.array(NodeBaseSchema)
}).strict();
