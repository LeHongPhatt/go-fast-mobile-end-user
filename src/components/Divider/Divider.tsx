import { ViewCus } from 'components/ViewCus';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from 'theme';

interface IProps {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const Divider: React.FC<IProps> = ({ small, medium, large, style, color }) => {
  const styleViews = StyleSheet.flatten([
    small && styles.small,
    medium && styles.medium,
    large && styles.large,
    color && { backgroundColor: color ?? Colors.disable },
    style,
  ]);
  return <ViewCus style={styleViews} />;
};
const styles = StyleSheet.create({
  small: {
    height: 1,
    backgroundColor: Colors.disable,
  },
  medium: {
    height: 4,
    backgroundColor: Colors.greyF5,
  },
  large: {
    height: 8,
    backgroundColor: Colors.greyF5,
  },
});
export default Divider;
