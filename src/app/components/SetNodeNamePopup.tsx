import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAtomValue } from "jotai";
import React from "react";
import { closeModal, editableNodeAtom, openedAtom, popupTypeAtom } from "./SetNodeNamePopupStore";

export type SetNodeNamePopupTypes = "rename" | "create" | null;

interface SetNodeNamePopupProps {
  onNameChanged: (name: string, editableNodeId: string | undefined) => void;
}

const getNames = (type: SetNodeNamePopupTypes) => {
  let title = "Node name";
  let submitButtonName = "Save";

  if (type === "create") {
    title = "Add node name";
    submitButtonName = "Save";
  } else if (type === "rename") {
    title = "Change node name";
    submitButtonName = "Change";
  }

  return {
    title,
    submitButtonName,
  };
};

export const SetNodeNamePopup = (props: SetNodeNamePopupProps) => {
  const { onNameChanged } = props;
  const opened = useAtomValue(openedAtom);
  const type = useAtomValue(popupTypeAtom);
  const editableNode = useAtomValue(editableNodeAtom);
  const nodeName = editableNode?.data.label || "";

  const { title, submitButtonName } = getNames(type);


  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: nodeName,
    },
    validate: {
      name: (value) => (value === "" ? "Node name can't be empty" : null),
    },
  });

  return (
    <Modal opened={opened} onClose={closeModal} title={title} centered>
      <form onSubmit={form.onSubmit(({ name }) => onNameChanged(name, editableNode?.id))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter the node name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">{submitButtonName}</Button>
        </Group>
      </form>
    </Modal>
  );
};
