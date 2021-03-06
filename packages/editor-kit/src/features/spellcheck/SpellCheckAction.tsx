import React from "react";
import { Action } from "../actions/Action";
import { block } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";

export interface SpellCheckActionProps {
  children: JSX.Element;
}

export const SpellCheckAction = (props: SpellCheckActionProps) => {
  const { children } = props;
  const { spellCheck, disableSpellCheck, enableSpellCheck } = useEditorKit();

  const isActive = () => spellCheck;
  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    block(event);
    if (isActive()) {
      disableSpellCheck();
    } else {
      enableSpellCheck();
    }
  };
  return (
    <Action onMouseDown={onMouseDown} isActive={isActive}>
      {children}
    </Action>
  );
};
