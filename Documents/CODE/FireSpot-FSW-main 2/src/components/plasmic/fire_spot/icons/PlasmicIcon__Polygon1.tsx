// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Polygon1IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Polygon1Icon(props: Polygon1IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 97 207"}
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
        d={"M48.5 0l48.064 206.25H.436L48.5 0z"}
        fill={"currentColor"}
        fillOpacity={".6"}
      ></path>
    </svg>
  );
}

export default Polygon1Icon;
/* prettier-ignore-end */
