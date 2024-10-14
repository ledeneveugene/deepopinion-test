import { atom } from "jotai";
import { SetNodeNamePopupTypes } from "./SetNodeNamePopup";
import { jotaiStore } from "../store/jotaiStore";
import { AppNode } from "./nodes/nodes";

type AppNodePartial = Required<Pick<AppNode, "id" | "data">> & Partial<AppNode> | null;

export const openedAtom = atom(false);
export const popupTypeAtom = atom<SetNodeNamePopupTypes>(null);
export const editableNodeAtom = atom<AppNodePartial>(null);


export const closeModal = () => {
  jotaiStore.set(editableNodeAtom, null);
  jotaiStore.set(openedAtom, false);
};

export const openModal = (
  node: AppNodePartial,
  popupType: SetNodeNamePopupTypes | null
) => {
  jotaiStore.set(editableNodeAtom, node);
  jotaiStore.set(popupTypeAtom, popupType);
  jotaiStore.set(openedAtom, true);
};
