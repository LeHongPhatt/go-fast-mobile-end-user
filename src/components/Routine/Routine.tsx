import { Divider, TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { BaseStyle, Colors } from 'theme';

interface IProps {
  from: string;
  to: string;
  note?: string;
  titleNote?: string;
  style?: StyleProp<ViewStyle>;
}
const Routine: React.FC<IProps> = ({ from, to, titleNote, note, style }) => {
  return (
    <ViewCus style={[BaseStyle.wrapperMain, style]}>
      <ViewCus style={[BaseStyle.flexRowCenter]}>
        <ViewCus style={styles.nonActive} />
        <TextCus style={BaseStyle.flexShrink1} numberOfLines={1}>
          {from}
        </TextCus>
      </ViewCus>
      <ViewCus style={styles.line} ml-8 />
      <ViewCus style={[BaseStyle.flexRowCenter]}>
        <ViewCus style={styles.active} />
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
  active: {
    width: 16,
    height: 16,
    borderWidth: 8,
    borderColor: Colors.main,
    borderRadius: 8,
    marginRight: 8,
  },
  nonActive: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: Colors.main,
    borderRadius: 8,
    marginRight: 8,
  },
  divider: {
    marginVertical: 12,
  },
});
export default Routine;
