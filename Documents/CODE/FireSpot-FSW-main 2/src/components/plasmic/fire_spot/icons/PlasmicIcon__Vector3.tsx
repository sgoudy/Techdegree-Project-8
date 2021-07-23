// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Vector3IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Vector3Icon(props: Vector3IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 31 38"}
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
          "M15.5 38c2.131 0 3.875-1.754 3.875-3.897h-7.75c0 2.143 1.744 3.897 3.875 3.897zm11.625-11.692v-9.744c0-5.982-3.158-10.99-8.719-12.316V2.923A2.91 2.91 0 0015.5 0a2.91 2.91 0 00-2.906 2.923v1.325c-5.541 1.325-8.719 6.314-8.719 12.316v9.744L0 30.205v1.949h31v-1.949l-3.875-3.897zm-3.875 1.948H7.75V16.564c0-4.833 2.926-8.77 7.75-8.77s7.75 3.937 7.75 8.77v11.692z"
        }
        fill={"currentColor"}
      ></path>
    </svg>
  );
}

export default Vector3Icon;
/* prettier-ignore-end */
