import { Colors } from 'theme';
export interface ISpacing {
  [key: string]: string;
}
const spacing: ISpacing = {
  'mt-': 'marginTop',
  'mb-': 'marginBottom',
  'mr-': 'marginRight',
  'ml-': 'marginLeft',
  'mx-': 'marginHorizontal',
  'my-': 'marginVertical',
  'pt-': 'paddingTop',
  'pb-': 'paddingBottom',
  'pr-': 'paddingRight',
  'pl-': 'paddingLeft',
  'px-': 'paddingHorizontal',
  'py-': 'paddingVertical',
  'm-': 'margin',
  'p-': 'padding',
  't-': 'top',
  'r-': 'right',
  'b-': 'bottom',
  'l-': 'left',
  'w-': 'width',
  'h-': 'height',
  'maxh-': 'maxHeight',
  'maxw-': 'maxWidth',
  'minh-': 'minHeight',
  'minw-': 'minWidth',
  'bg-': 'backgroundColor',
  'flex-': 'flexDirection',
  'items-': 'alignItems',
  'justify-': 'justifyContent',
  'br-': 'borderRadius',
  'bo-': 'borderWidth',
  'bbw-': 'borderBottomWidth',
  'btw-': 'borderTopWidth',
  'brw-': 'borderRightWidth',
  'blw-': 'borderLeftWidth',
  'brc-': 'borderRightColor',
  'btc-': 'borderTopColor',
  'bbc-': 'borderBottomColor',
  'blc-': 'borderLeftColor',
  'bc-': 'borderColor',
  'color-': 'color',
  'f-': 'flex',
  'flexGrow-': 'flexGrow',
};

export const withOpacity = (color, opacity) => {
  let op = Math.round(255 * opacity);
  return `${color}${op.toString(16).toUpperCase()}`;
};
const color = {
  'brc-': true,
  'btc-': true,
  'bbc-': true,
  'blc-': true,
  'bc-': true,
  'bg-': true,
  'color-': true,
};
const styleElement = {
  'flex-': true,
  'items-': true,
  'justify-': true,
  ...color,
};

export const styleSpacing = (key: string) => {
  const prefix = Object.keys(spacing).find(p => key.startsWith(p));
  if (prefix) {
    const prop = spacing[prefix];
    const keys = key.split(prefix)[1];
    const vals = styleElement[prefix] ? keys : Number(keys);
    const v = color[prefix] ? Colors[`${vals}`] : vals;
    return { [prop]: v };
  }
  return {};
};
