import React, {ReactNode} from 'react'
import { GRAY_COLOR, MAIN_COLOR, RED_COLOR, YELLOW_COLOR } from '../../../Admin/consts';
import cl from './Button.module.css';

interface IProps {
  type:ButtonType,
  variant?:ButtonColorType,
  children:ReactNode,
  onClick?:() => void,
  disabled?: boolean,
}

type ButtonType = "submit" | "button";
type ButtonColorType = "primary" | "secondary" | "danger" | "warning"

export const Button = (props:IProps) => {
  const variantColors: Record<ButtonColorType, string> = {
    primary: MAIN_COLOR,
    secondary: GRAY_COLOR,
    danger: RED_COLOR,
    warning: YELLOW_COLOR,
  };

  const backgroundColor = props.variant ? variantColors[props.variant] : "transparent";

  const buttonStyle: React.CSSProperties = {
    backgroundColor,
  };

  return (
    <button onClick={props.onClick} style={buttonStyle} className={cl.button} disabled={props.disabled}>{props.children}</button>
  )
}
