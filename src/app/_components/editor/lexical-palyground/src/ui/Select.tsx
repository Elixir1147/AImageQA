/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "./Select.css";

import * as React from "react";

type SelectIntrinsicProps = JSX.IntrinsicElements["select"];
interface SelectProps extends SelectIntrinsicProps {
  label: string;
}

export default function Select({
  children,
  label,
  className,
  ...other
}: SelectProps): JSX.Element {
  return (
    <div className="Input__wrapper">
      <label
        style={{
          marginTop: "-1em",
        }}
        className="Input__label"
      >
        {label}
      </label>
      <select
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundColor: "transparent",
          border: "none",
          paddingRight: "1em",
          margin: 0,
          fontFamily: "inherit",
          fontSize: "inherit",
          cursor: "inherit",
          lineHeight: "inherit",
          zIndex: 1,
          outline: "none",
        }}
        {...other}
        className={className || "select"}
      >
        {children}
      </select>
    </div>
  );
}
