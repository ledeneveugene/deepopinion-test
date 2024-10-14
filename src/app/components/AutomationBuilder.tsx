"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  MiniMap,
  NodeTypes,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import Sidebar from "./Sidebar";
import { useDnD } from "../contexts/DnDContext";

import "@xyflow/react/dist/style.css";
import "./styles.css";
import DefaultNode from "./nodes/DefaultNode";
import { SetNodeNamePopup } from "./SetNodeNamePopup";
import { AppNode } from "./nodes/nodes";
import { closeModal, openedAtom, openModal } from "./SetNodeNamePopupStore";
import { useAtomValue } from "jotai";
import { useHasFlowDataChanged } from "../hooks/useHasFlowDataChanged";
import throttle from "lodash/throttle";

let id = 0;
const getId = () => `dndnode_${id++}`;

// list of possible node types
const nodeTypes: NodeTypes = {
  input: DefaultNode,
  default: DefaultNode,
  output: DefaultNode,
};

const updateData = async (nodes: AppNode[], edges: Edge[]) => {
  const data = await fetch("/api/automation", {
    method: "PUT",
    body: JSON.stringify({ nodes, edges }),
  });
  if (data.ok === true) {
    console.info("the data was updated successfully");
  } else {
    console.error("the data was not updated");
  }
};

const AutomationBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const enableAutoSave = useRef(false);
  const updateDataThrottle = useRef(
    throttle(updateData, 2000, { leading: false })
  );

  const { screenToFlowPosition } = useReactFlow();
  const { type } = useDnD();

  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const hasFlowDataChanged = useHasFlowDataChanged(
    nodes,
    edges,
    enableAutoSave.current
  );
  const opened = useAtomValue(openedAtom);

  const onNameChanged = useCallback((name: string, editableNodeId: string | undefined) => {
    if (editableNodeId) {
      setNodes((nodesState) => {
        return nodesState.map((node) =>
          node.id === editableNodeId
            ? {
                ...node,
                data: {
                  label: name,
                },
              }
            : node
        );
      });

      closeModal();
    }
  }, [setNodes, closeModal]);

  // we load the data from the server on mount
  useEffect(() => {
    const getData = async () => {
      const data = await fetch("/api/automation");
      const automation = await data.json();
      setNodes(automation.nodes);
      setEdges(automation.edges);
      enableAutoSave.current = true;
    };
    getData();
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (!hasFlowDataChanged) {
      return;
    }

    updateDataThrottle.current(nodes, edges);
  }, [hasFlowDataChanged, nodes, edges]);

  // various callbacks
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: AppNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => [...nds, newNode]);
      openModal(newNode, "create");
    },
    [screenToFlowPosition, type, setNodes]
  );

  return (
    <div className="automation-builder">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="overview"
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
      {opened && <SetNodeNamePopup onNameChanged={onNameChanged} />}
    </div>
  );
};

export default AutomationBuilder;
