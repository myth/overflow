import * as React from "react";

import "./button.scss";
import { checkPropTypes } from "prop-types";

export enum ButtonType {
  DEFAULT = "btn-gray",
  GREEN = "btn-green",
  RED = "btn-red",
  ORANGE = "btn-orange"
}

export interface ButtonProps {
  value: string
  type: ButtonType
  title?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const Button: React.SFC<ButtonProps> = props => {
  return (
    <button className={`btn ${props.type}`} title={props.title} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export function createButton(type: ButtonType,
  value: string,
  title?: string,
  handler?: (event: React.MouseEvent<HTMLElement>) => void) {
  return (
    <Button value={value} title={title} onClick={handler} type={type}></Button>
  )
}
