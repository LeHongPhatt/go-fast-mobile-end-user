import { ReactNode } from 'react';
import { StyleProp, TextProps, ViewProps } from 'react-native';

export interface IText extends TextProps {
  // props style
  heading1?: boolean; // 24
  heading2?: boolean; // 22
  heading3?: boolean; // 20
  heading4?: boolean; // 18
  heading5?: boolean; // 16
  mainSize?: boolean; // 14
  subhead?: boolean; // 12
  caption?: boolean; // 10
  // props colors
  color?: string;
  main?: boolean;
  error?: boolean;
  success?: boolean;
  subHeadColor?: boolean;
  headingColor?: boolean;
  // props font
  bold?: boolean;
  regular?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  // props styles
  style?: StyleProp<any>;
  children?: ReactNode;
  useI18n?: boolean;
  paramI18n?: any;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
}
export interface IView extends ViewProps {}

export interface IStyleSpacing {
  'mt-'?: boolean;
  'mb-'?: boolean;
  'mr-'?: boolean;
  'ml-'?: boolean;
  'mx-'?: boolean;
  'my-'?: boolean;
  'pt-'?: boolean;
  'pb-'?: boolean;
  'pr-'?: boolean;
  'pl-'?: boolean;
  'px-'?: boolean;
  'py-'?: boolean;
  'm-'?: boolean;
  'p-'?: boolean;
  't-'?: boolean;
  'r-'?: boolean;
  'b-'?: boolean;
  'l-'?: boolean;
  'w-'?: boolean;
  'h-'?: boolean;
  'maxh-'?: boolean;
  'maxw-'?: boolean;
  'minh-'?: boolean;
  'minw-'?: boolean;
  'bg-'?: boolean;
  'flex-'?: boolean;
  'items-'?: boolean;
  'justify-'?: boolean;
  'br-'?: boolean;
  'bo-'?: boolean;
  'bbw-'?: boolean;
  'btw-'?: boolean;
  'brw-'?: boolean;
  'blw-'?: boolean;
  'brc-'?: boolean;
  'btc-'?: boolean;
  'bbc-'?: boolean;
  'blc-'?: boolean;
  'bc-'?: boolean;
  'color-'?: boolean;
  'f-'?: boolean;
  'flexGrow-'?: boolean;
}
export interface IButtons {
  style?: any;
  shadow?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  outline?: boolean;
  full?: boolean;
  round?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  textBtn?: string;
}
