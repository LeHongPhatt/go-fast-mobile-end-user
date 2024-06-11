import React from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { TextCus, TouchCus, ViewCus } from 'components';
import styles from './styles';
import { BaseStyle, Colors } from 'theme';
import { FindCarScreenStepView } from '../FindCar';

interface IProps {
  setStepView?: React.Dispatch<React.SetStateAction<FindCarScreenStepView>>;
}

const QuestionFromTo: React.FC<IProps> = props => {
  return (
    <ViewCus flex-1 flex-column flexGrow-1 style={[styles.w100]}>
      <BottomSheetScrollView
        style={{
          paddingHorizontal: 16,
        }}>
        <ViewCus flex-1>
          <TextCus heading2>Bạn muốn đi đâu?</TextCus>
          <TouchCus
            mt-10
            items-center
            onPress={() => {
              props.setStepView?.(FindCarScreenStepView.CHOOSE_FROM_TO);
            }}
            style={[
              BaseStyle.flexRow,
              {
                borderWidth: 1,
                paddingHorizontal: 8,
                paddingVertical: 12,
                borderRadius: 8,
              },
            ]}>
            <ViewCus>
              <Icon.IconLocationActive height={20} width={20} />
            </ViewCus>
            <ViewCus f-1>
              <TextCus ml-5 color={Colors.disable}>
                Tìm địa điểm đến
              </TextCus>
            </ViewCus>
            <ViewCus
              style={{
                right: 0,
              }}>
              <Icon.Voice color={Colors.main} height={20} width={20} />
            </ViewCus>
          </TouchCus>
        </ViewCus>
      </BottomSheetScrollView>
    </ViewCus>
  );
};

export default QuestionFromTo;
