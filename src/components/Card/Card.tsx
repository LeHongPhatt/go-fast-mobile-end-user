import React from 'react';
import { ViewCus } from 'components';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from 'theme';

export interface Card {
  hasShadow?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Card(props: Card & React.PropsWithChildren) {
  const { hasShadow, children, style, ...rest } = props;
  return (
    <ViewCus
      p-16
      {...rest}
      style={[hasShadow && styles.shadow, styles.card, style]}>
      {children}
    </ViewCus>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#8a8989',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10.24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
});
