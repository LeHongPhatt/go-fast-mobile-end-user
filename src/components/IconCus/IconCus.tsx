import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function IconCus(props: IIcons) {
  const { style, enableRTL, name, type, ...rest } = props;
  const layoutStyle = enableRTL ? styles.styleRTL : {};
  const icons = () => {
    switch (type) {
      case typeIcon.MaterialCommunity:
        return <MaterialCommunityIcons name={name} {...rest} />;

      default:
        return (
          <Icon
            name={name}
            style={StyleSheet.flatten([style, layoutStyle])}
            {...rest}
          />
        );
    }
  };
  return <>{icons()}</>;
}

enum typeIcon {
  'MaterialCommunity' = 'MaterialCommunity',
}
export interface IIcons {
  style?: any;
  type?: any;
  size?: number;
  name: any;
  color?: string;
  solid?: boolean;
  enableRTL?: boolean;
}
