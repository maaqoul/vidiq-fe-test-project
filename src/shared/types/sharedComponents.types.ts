import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';

export interface CustomButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    React.AriaAttributes {
  title?: string;
  icon?: ReactElement;
}

export type ScoreType = 'red' | 'yellow' | 'orange' | 'light green' | 'green';
