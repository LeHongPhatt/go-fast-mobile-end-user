import React from 'react';
import { IconApp } from '../IconApp';
import { IconName } from 'assets';
import { ViewCus } from '../ViewCus';
import { Colors } from 'theme';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IProps {
  point: number;
  count?: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const StarsRating: React.FC<IProps> = ({
  point,
  count = 5,
  size = 18,
  style,
}) => {
  return (
    <ViewCus flex-row>
      {Array(point)
        .fill(0)
        .map((_, i) => (
          <IconApp
            key={i}
            name={IconName.Start}
            size={size}
            color={Colors.yellowF9}
            style={[styles.mr, style]}
          />
        ))}
      {Array(count - Number(point))
        .fill(0)
        .map((_, i) => (
          <IconApp
            key={i}
            name={IconName.Start}
            size={18}
            color={Colors.disable}
            style={[styles.mr, style]}
          />
        ))}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  mr: {
    marginRight: 5,
  },
});
export default StarsRating;
