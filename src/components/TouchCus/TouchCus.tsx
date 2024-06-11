import { withStyle } from 'HOC';
import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const TouchCus: React.FC<ITextInputs> = props => {
  const { onPress, onLongPress, style, ...rest } = props;
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
      {...rest}>
      {props.children}
    </TouchableOpacity>
  );
};
export default withStyle(TouchCus);
export interface ITextInputs extends TouchableOpacityProps {
  style?: any;
  children: ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  activeOpacity?: number;
  hitSlop?: any;
}
