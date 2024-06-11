import { ViewCus } from 'components';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { BaseStyle, Colors } from 'theme';

interface IProps {
  style?: StyleProp<ViewStyle>;
  keyValue: string | number;
  listData: {
    key: string | number;
    icon: React.JSX.Element;
  }[];
}
const RoutineStep: React.FC<IProps> = props => {
  if (props.listData.length === 0 || !props.keyValue) {
    return <></>;
  }

  const indexAccess = props.listData.findIndex(
    val => val.key === props.keyValue,
  );
  return (
    <ViewCus style={[BaseStyle.flexRowSpaceBetwwen, styles.w100, props.style]}>
      {props.listData.map((val, index) => {
        return (
          <ViewCus
            key={index}
            style={[
              index !== props.listData.length - 1 ? BaseStyle.flex1 : null,
            ]}>
            <ViewCus flex-row style={[styles.wrapRow]}>
              <ViewCus>{val.icon}</ViewCus>
              {index !== props.listData.length - 1 && (
                <ViewCus style={[styles.wrapLine]}>
                  <ViewCus
                    style={[
                      styles.lineStyle,
                      index < indexAccess ? styles.lineColorAccess : null,
                    ]}
                  />
                </ViewCus>
              )}
            </ViewCus>
          </ViewCus>
        );
      })}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  w100: {
    width: '100%',
  },
  flex1: {
    flex: 1,
  },
  wrapRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapLine: {
    flexGrow: 1,
    paddingHorizontal: 11,
  },
  lineStyle: {
    height: 3,
    borderRadius: 3,
    backgroundColor: Colors.greyEE,
  },
  lineColorAccess: {
    backgroundColor: Colors.success,
  },
});
export default RoutineStep;
