"use client";

import { usePrevious } from "@mantine/hooks";
import { Edge, Node } from "@xyflow/react";
import pick from "lodash/pick";
import { isArrayEqual } from "../helpers/isArrayEqual";
import { useMemo } from "react";

const NODE_FIELDS = ["id", "position", "data", "type"];
const EDGE_FIELDS = ["id", "source", "target"];

export const useHasFlowDataChanged = (
  nodes: Node[],
  edges: Edge[],
  enableSaving: boolean
) => {
  const previousNodes = usePrevious(nodes);
  const previousEdges = usePrevious(edges);
  const previousEnableAutoSave = usePrevious(enableSaving);

  const isNodeChanged = useMemo(() => {
    if (!previousEnableAutoSave) {
      return false;
    }

    return !isArrayEqual(
      nodes.map((node) => pick(node, NODE_FIELDS)),
      previousNodes?.map((previousNode) => pick(previousNode, NODE_FIELDS))
    );

  }, [nodes, previousNodes, previousEnableAutoSave]);

  const isEdgeChanged = useMemo(() => {
    if (!previousEnableAutoSave) {
      return false;
    }

    return !isArrayEqual(
      edges.map((edge) => pick(edge, EDGE_FIELDS)),
      previousEdges?.map((previousEdge) => pick(previousEdge, EDGE_FIELDS))
    );
  }, [edges, previousEdges, previousEnableAutoSave]);

  return isNodeChanged || isEdgeChanged;
};
