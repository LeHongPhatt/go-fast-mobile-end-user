import React, { ComponentType, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { IStyleSpacing } from 'types';
import { styleSpacing } from 'utils';
export default function withStyle<T>(WrapperComponent: ComponentType<T>) {
  return React.forwardRef<any, IStyleSpacing & T>((props, ref) => {
    const styleContainer = useMemo(() => {
      const arrRest = Object.keys(props);
      const styleObj = arrRest.reduce((prev, key) => {
        const resultSpacing = styleSpacing(key);
        return { ...prev, ...resultSpacing };
      }, {});
      const result = StyleSheet.flatten([styleObj, props?.style]);
      return result;
    }, [props]);
    return <WrapperComponent ref={ref} {...props} style={styleContainer} />;
  });
}
export const withOpacity = (color, opacity) => {
  let op = Math.round(255 * opacity);
  return `${color}${op.toString(16).toUpperCase()}`;
};
