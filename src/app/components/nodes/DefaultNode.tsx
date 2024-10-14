import { memo } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { IconEdit } from "@tabler/icons-react";

import { DefaultNodeData } from "./nodes";

import "./DefaultNode.css";
import { openModal } from "../SetNodeNamePopupStore";

const DefaultNode = (props: NodeProps<DefaultNodeData>) => {
  const { data, selected, type, id } = props;

  const onIconClick = () => {
    openModal({ id, data }, "rename");
  };

  return (
    <div className={`default-node${selected ? " selected" : ""}`}>
      {type !== "input" && <Handle type="target" position={Position.Left} />}
      <div className="node">
        <IconEdit className="edit-icon" size={16} onClick={onIconClick} />
        <strong>{data.label}</strong>
      </div>
      {type !== "output" && <Handle type="source" position={Position.Right} />}
    </div>
  );
};

export default memo(DefaultNode);
