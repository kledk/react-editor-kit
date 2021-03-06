import React, { CSSProperties, memo } from "react";
import { block } from "../../ui/Utils";

export interface PopupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[];
  style?: CSSProperties;
}

export const PopupContent = memo(
  React.forwardRef((props: PopupContentProps, ref: any) => {
    const { style, children, ...rest } = props;
    return (
      <div
        ref={ref}
        className="rek-floating-content"
        style={style}
        onMouseDown={block}
        {...rest}
      >
        {children}
      </div>
    );
  })
);
