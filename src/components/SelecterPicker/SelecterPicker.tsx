import { DatePicker, TextCus, TimePicker, ViewCus } from 'components';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from 'theme';
import { Action } from './Action';
import { SectionTitle } from './SectionTitle';
import { dimensions } from 'utils';
import { SELECT_OPTION, dataDates, dataTimes } from 'types';
import { OptionPicker } from './OptionPicker';
const { width } = dimensions;
interface IProps {
  selectType: string;
  onConfirmSelect: (value: any) => void;
  minDate?: string | undefined;
  maxDate?: string;
  addedMinutes?: string;
  onCancelSelect: () => void;
  selectOptionTitle?: string;
  customHeaderStyle?: ViewStyle;
  selectedPickerTime?: any;
  selectedPickerDate?: string | number;
  selectedChooseOption?: {
    index: number;
    data: string;
  };
  dataOptions?: string[] | number[];
}
const SelecterPicker: React.FC<IProps> = ({
  selectType,
  onConfirmSelect,
  minDate,
  maxDate,
  addedMinutes,
  onCancelSelect,
  selectOptionTitle,
  customHeaderStyle,
  selectedPickerTime,
  selectedPickerDate,
  dataOptions,
  selectedChooseOption,
}) => {
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedOption, setSelectedOption] = useState({});

  const renderSelectOption = useCallback(() => {
    switch (selectType) {
      case SELECT_OPTION.DATE_PICKER:
        return (
          <DatePicker
            minDate={minDate!}
            maxDate={maxDate!}
            selectedDate={
              selectedPickerDate
                ? selectedPickerDate
                : moment().format('DD/MM/YYYY')
            }
            onChange={setSelectedDate}
          />
        );
      case SELECT_OPTION.OPTION_PICKER:
        return (
          <OptionPicker
            dataOptions={dataOptions!}
            selectedOption={
              selectedChooseOption
                ? selectedChooseOption
                : { index: 1, data: 'Nữ' }
            }
            setSelectedOption={setSelectedOption}
          />
        );
      case SELECT_OPTION.TIME_PICKER:
        return (
          <TimePicker
            addedMinutes={addedMinutes!}
            selectedTime={selectedPickerTime!}
            setSelectedInformation={setSelectedTime}
          />
        );
    }
  }, [
    selectType,
    minDate,
    maxDate,
    addedMinutes,
    selectedPickerDate,
    selectedPickerTime,
  ]);
  const onChooseSelect = useCallback(() => {
    switch (selectType) {
      case SELECT_OPTION.DATE_PICKER: {
        return onConfirmSelect(selectedDate);
      }
      case SELECT_OPTION.OPTION_PICKER: {
        return onConfirmSelect(selectedOption);
      }
      case SELECT_OPTION.TIME_PICKER: {
        return onConfirmSelect(selectedTime);
      }
    }
  }, [selectType, selectedTime, selectedDate, onConfirmSelect, selectedOption]);
  const getSectionTitle = useCallback(() => {
    switch (selectType) {
      case SELECT_OPTION.DATE_PICKER: {
        return dataDates;
      }
      case SELECT_OPTION.TIME_PICKER: {
        return dataTimes;
      }
      default:
        return [];
    }
  }, [selectType]);

  return (
    <ViewCus style={[styles.fullWidth]}>
      <View style={styles.content}>
        <View style={[styles.header, customHeaderStyle]}>
          <TextCus mb-10 heading5 style={[styles.letterspacing]} bold useI18n>
            {selectOptionTitle}
          </TextCus>
        </View>
      </View>
      {getSectionTitle().length > 0 ? (
        <View style={styles.contentTitle}>
          <View style={styles.contentSection}>
            {getSectionTitle()?.map(section => {
              return (
                <SectionTitle
                  key={section.sectionTitle}
                  title={section.sectionTitle}
                />
              );
            })}
          </View>
        </View>
      ) : null}
      {renderSelectOption()}
      <Action onCancelSelect={onCancelSelect} onChooseSelect={onChooseSelect} />
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.greyEE,
    borderBottomWidth: 1,
  },
  letterspacing: {
    letterSpacing: 0.4,
  },
  contentTitle: {
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
  },
  contentSection: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 13,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyEE,
  },
  fullWidth: {
    width: width,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default SelecterPicker;
