import { TextCus, TouchCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

interface Props {
  onCancelSelect: () => void;
  onChooseSelect: () => void;
}
const Action: React.FC<Props> = ({ onCancelSelect, onChooseSelect }) => {
  return (
    <ViewCus style={styles.container}>
      <TouchCus onPress={onCancelSelect} style={styles.btn}>
        <TextCus useI18n heading5>
          action.cancel
        </TextCus>
      </TouchCus>
      <TouchCus
        onPress={onChooseSelect}
        style={[styles.btn, { backgroundColor: Colors.main }]}>
        <TextCus useI18n heading5 color-white>
          action.choose
        </TextCus>
      </TouchCus>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 13,
    paddingHorizontal: 14,
  },
  btn: {
    width: '45%',
    justifyContent: 'center',
    backgroundColor: Colors.greyEE,
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 10,
    display: 'flex',
  },
});
export default Action;
