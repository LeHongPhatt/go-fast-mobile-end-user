import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { TextCus } from '../TextCus';
import { TouchCus } from '../TouchCus';
import { ViewCus } from '../ViewCus';
interface IProps {
  title?: string;
  chooseId: number;
  onChoosed: (id: number) => void;
  choosed: number;
}

const Radio: React.FC<IProps> = ({ title, chooseId, onChoosed, choosed }) => {
  const onRadio = useCallback(
    (id: number) => {
      onChoosed(id);
    },
    [onChoosed],
  );
  return (
    <ViewCus flex-row items-center>
      <TouchCus onPress={() => onRadio(chooseId)}>
        <ViewCus
          style={[
            styles.unSelectedCheckBox,
            chooseId === choosed && styles.selectedCheckBox,
          ]}>
          <ViewCus
            style={[styles.dot, chooseId === choosed && styles.dotActive]}
          />
        </ViewCus>
      </TouchCus>
      {title && (
        <TextCus useI18n ml-8>
          {title}
        </TextCus>
      )}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  selectedCheckBox: {
    borderColor: Colors.blue47,
  },
  dotActive: {
    borderColor: Colors.blue47,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 6,
    borderColor: Colors.transparent,
  },
  unSelectedCheckBox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.greyD1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Radio;
