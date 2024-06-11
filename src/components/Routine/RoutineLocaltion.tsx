import { Divider, TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'assets/svg/Icon';
import { BaseStyle, Colors } from 'theme';

interface IProps {
  from: string;
  to: string;
  note?: string;
  titleNote?: string;
  style?: StyleProp<ViewStyle>;
  iconActive?: React.JSX.Element;
  iconDeactive?: React.JSX.Element;
}
const RoutineLocaltion: React.FC<IProps> = ({
  from,
  to,
  titleNote,
  note,
  style,
  iconActive,
  iconDeactive,
}) => {
  iconActive = iconActive ?? <Icon.IconLocationActive />;
  iconDeactive = iconDeactive ?? <Icon.IconLocation />;
  return (
    <ViewCus style={[BaseStyle.wrapperMain, style]}>
      <ViewCus style={[BaseStyle.flexRowCenter]}>
        <ViewCus mr-8>{iconDeactive}</ViewCus>
        <TextCus style={BaseStyle.flexShrink1} numberOfLines={1}>
          {from}
        </TextCus>
      </ViewCus>
      <ViewCus style={styles.line} ml-8 />
      <ViewCus style={[BaseStyle.flexRowCenter]}>
        <ViewCus mr-8>{iconActive}</ViewCus>
        <TextCus style={BaseStyle.flexShrink1} numberOfLines={1}>
          {to}
        </TextCus>
      </ViewCus>
      <Divider small color={Colors.greyEE} style={styles.divider} />
      {titleNote && <TextCus bold>{titleNote}</TextCus>}
      {note && <TextCus>{note}</TextCus>}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.main,
  },
  divider: {
    marginVertical: 12,
  },
});
export default RoutineLocaltion;
