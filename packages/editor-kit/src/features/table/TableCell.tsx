import React, { memo } from "react";
import { RenderElementProps } from "slate-react";
import { Show } from "../../ui/Show";
import { Icon } from "../icons/Icon";
import { List } from "../../ui/List";
import { useTables } from "./Tables";
import { ModalPopup } from "../popup/ElementModalPopup";
import { FocusPopup } from "../popup/FocusPopup";
import { usePlugin } from "../../plugins/usePlugin";
import { IconProvider } from "../icons/IconProviderPlugin";

export const TableCell = memo((props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const { handleClick, showMenu, listItems } = useTables(props);
  const { data: icons } = usePlugin("icon-provider") as IconProvider;
  return (
    <td {...attributes} className="rek-td">
      <Show when={!showMenu}>
        <FocusPopup
          element={element}
          location="inside-end"
          offsets={{ v: 2, h: 2 }}
        >
          <div className="rek-table-cell-menu" onClick={handleClick}>
            <Icon
              icon={icons.dropdownIcon}
              className="rek-table-cell-menu-icon"
            />
          </div>
        </FocusPopup>
      </Show>
      {children}
      <Show when={showMenu}>
        <ModalPopup
          show={showMenu}
          element={element}
          onClickOutside={handleClick}
          location="inside-end"
          offsets={{ v: 0, h: 0 }}
        >
          <List items={listItems.current} />
        </ModalPopup>
      </Show>
    </td>
  );
});
