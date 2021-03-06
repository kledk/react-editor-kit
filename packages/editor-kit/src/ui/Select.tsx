import React, { useState, CSSProperties, useRef, useEffect } from "react";
import { List, ListItem } from "./List";
import { ModalPopup } from "../features/popup/HtmlElementModalPopup";
import { usePlugin } from "../plugins/usePlugin";
import { IconProvider } from "../features/icons/IconProviderPlugin";
import { block } from "./Utils";
import { useKeyNavigation } from "./KeyNavigation";

export interface SelectProps {
  onInputChange?(value: string): void;
  onItemSelected(item: SelectItem): void;
  onFocus?(): void;
  className?: string;
  items: SelectItem[];
  selected?: SelectItem;
  value?: string | number;
  type?: string;
  editable?: boolean;
}

export interface SelectItem {
  text: string;
  value: any;
  style?: CSSProperties;
  disabled?: boolean;
}

export const Select = (props: SelectProps) => {
  const {
    show,
    items,
    value,
    activeIndex,
    element,
    handleRef,
    handleValueChange,
    hideChoices,
    handleFocus
  } = useSelect(props);
  const disabled = !items.find(item => !item.disabled);
  const { data: icons } = usePlugin("icon-provider") as IconProvider;
  const focusClass = show ? "focus" : "";
  const disabledClass = disabled ? "rek-disabled" : "";
  const className = `${props.className ||
    ""} rek-select ${focusClass} ${disabledClass}`;

  return (
    <div
      className={className}
      onClick={stop}
      onKeyDown={stop}
      ref={handleRef}
      onMouseDown={disabled ? undefined : handleFocus}
    >
      <input
        className="rek-input"
        value={value}
        onChange={handleValueChange}
        ref={handleRef}
        disabled={disabled || !props.editable}
        type={props.type}
      />
      {icons.dropdownIcon}
      <ModalPopup
        show={show}
        element={element as HTMLElement}
        onClickOutside={hideChoices}
      >
        <List
          items={items}
          activeIndex={activeIndex}
          className="rek-select-list"
          style={getStyle(element)}
        />
      </ModalPopup>
    </div>
  );
};

export const useSelect = (props: SelectProps) => {
  const [show, setShow] = useState(false);
  const hideChoices = () => setShow(false);
  const [value, setValue] = useState(props.value || "");
  const element = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const items: ListItem[] = props.items.map(item => {
    return {
      text: item.text,
      style: item.style,
      onClick: () => {
        setShow(false);
        props.onItemSelected(item);
      },
      value: item.value,
      disabled: item.disabled
    };
  });

  const filteredItems = filterItems(value, items);
  const selected = filteredItems.findIndex(
    item => (item as any).value == props.selected
  );
  const activeItemIndex = selected > -1 ? selected : 0;

  const handleSelect = (index: number) => {
    const item = filteredItems[index] as any;
    const value = item.value.value;
    setValue(value);
    setShow(false);
    props.onItemSelected(item as SelectItem);
  };

  const { activeIndex, setActive } = useKeyNavigation(
    filteredItems.length,
    handleSelect,
    activeItemIndex,
    show
  );

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const index = items.findIndex(item => item.text === value);
    setActive(Math.max(index, 0));
    props.onInputChange && props.onInputChange(value);
    setValue(value);
    setShow(true);
  };

  const handleRef = (ref: HTMLInputElement | null) => {
    element.current = ref;
  };

  const handleFocus = (event: React.MouseEvent) => {
    block(event);
    props.onFocus && props.onFocus();
    setShow(true);
    ((element.current as HTMLElement).firstChild as HTMLInputElement).focus();
  };

  return {
    show,
    value,
    activeIndex,
    handleRef,
    handleValueChange,
    handleFocus,
    items: filteredItems,
    hideChoices,
    element: element.current
  };
};

const filterItems = (filter: string | number, items: ListItem[]) => {
  const lower = String(filter).toLowerCase();
  if (!filter || items.find(item => item.text?.toLowerCase() === lower)) {
    return items;
  }
  const result = items.filter(item => item.text!.toLowerCase().includes(lower));
  return result.length ? result : items;
};

const getStyle = (element: HTMLElement | null) => {
  if (element) {
    const { width } = element.getBoundingClientRect();
    return { width, maxHeight: window.innerHeight - 32, height: "auto" };
  }
  return {};
};
