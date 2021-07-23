// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Vector2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Vector2Icon(props: Vector2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      width={"1em"}
      style={{
        fill: "currentcolor",

        ...(style || {}),
      }}
      className={classNames("plasmic-default__svg", className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          "M8.667 0a8.667 8.667 0 018.666 8.667c0 2.146-.786 4.12-2.08 5.64l.36.36h1.054l6.666 6.666-2 2-6.666-6.666v-1.054l-.36-.36a8.687 8.687 0 01-5.64 2.08A8.667 8.667 0 018.667 0zm0 2.667c-3.334 0-6 2.666-6 6 0 3.333 2.666 6 6 6 3.333 0 6-2.667 6-6 0-3.334-2.667-6-6-6z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Vector2Icon;
/* prettier-ignore-end */
