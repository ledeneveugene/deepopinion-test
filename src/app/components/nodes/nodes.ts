import { Node } from "@xyflow/react";

export type AppNodeTypes = "input" | "default" | "output"

export type DefaultNodeData = Node<{ label: string }>;

export type AppNode = DefaultNodeData;

