import { ScrollPicker } from 'components';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'theme';
import { genValue, getDateInMonth } from 'utils';
interface Props {
  maxDate: string;
  minDate: string;
  selectedDate: string;
  onChange: (value: any) => void;
}
const DatePicker: React.FC<Props> = ({
  maxDate = '31/12/2030',
  minDate = '01/01/1900',
  selectedDate = moment().format('DD/MM/YYYY'),
  onChange,
}) => {
  const minYear = parseInt(moment(minDate, 'DD/MM/YYYY').format('YYYY'));
  const maxYear = parseInt(moment(maxDate, 'DD/MM/YYYY').format('YYYY'));
  const selectedYearValue = parseInt(
    moment(selectedDate, 'DD/MM/YYYY').format('YYYY'),
  );
  const minDay = parseInt(moment(minDate, 'DD/MM/YYYY').format('DD'));
  const maxDay = parseInt(moment(maxDate, 'DD/MM/YYYY').format('DD'));

  const minMonth = parseInt(moment(minDate, 'DD/MM/YYYY').format('MM'));
  const maxMonth = parseInt(moment(maxDate, 'DD/MM/YYYY').format('MM'));
  const selectedMonthValue = parseInt(
    moment(selectedDate, 'DD/MM/YYYY').format('MM'),
  );

  const [listYear, setListYear] = useState<string[]>([]);

  const [listDay, setListDay] = useState<string[]>([]);

  const [listMonth, setListMonth] = useState<string[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(-1);
  const [selectedYearIndex, setSelectedYearIndex] = useState(-1);
  useEffect(() => {
    let selectedYear = moment(selectedDate, 'DD/MM/YYYY').format('YYYY');

    const itemListYear = genValue(minYear, maxYear);
    setListYear(itemListYear);

    const selectedYearIndexTemp = itemListYear?.findIndex(
      y => y === selectedYear,
    );
    if (selectedYearIndexTemp > -1) {
      setSelectedYearIndex(
        selectedYearIndexTemp > -1 ? selectedYearIndexTemp : 0,
      );
    }
  }, [maxDate, minDate, selectedDate]);

  useEffect(() => {
    const selectedYear =
      parseInt(listYear?.[selectedYearIndex]) || selectedYearValue;
    let itemListMonth: string[] = [];
    if (selectedYear > minYear && selectedYear < maxYear) {
      itemListMonth = genValue(1, 12);
      setListMonth(itemListMonth);
    }
    if (selectedYear === minYear && selectedYear !== maxYear) {
      itemListMonth = genValue(minMonth, 12);
    }
    if (selectedYear !== minYear && selectedYear === maxYear) {
      itemListMonth = genValue(1, maxMonth);
    }
    if (selectedYear === minYear && selectedYear === maxYear) {
      itemListMonth = genValue(minMonth, maxMonth);
    }

    setListMonth(itemListMonth);
    const tempMonth =
      listMonth[selectedMonthIndex] ||
      moment(selectedDate, 'DD/MM/YYYY').format('MM');

    const selectedMonthIndexTemp = itemListMonth?.findIndex(
      m => m === tempMonth,
    );
    setSelectedMonthIndex(
      selectedMonthIndexTemp > -1 ? selectedMonthIndexTemp : 0,
    );
  }, [selectedYearIndex, selectedDate]);

  useEffect(() => {
    const selectedYear =
      parseInt(listYear?.[selectedYearIndex]) || selectedYearValue;
    const selectedMonth =
      parseInt(listMonth?.[selectedMonthIndex]) || selectedMonthValue;

    let itemListDay: string[] = [];
    let countDay = getDateInMonth(selectedYear, selectedMonth);
    itemListDay = genValue(1, countDay);
    if (selectedYear === minYear) {
      if (minMonth === selectedMonth) {
        itemListDay = genValue(minDay, countDay);
      }
    }
    if (selectedYear === maxYear) {
      if (maxMonth === selectedMonth) {
        itemListDay = genValue(1, maxDay);
      }
    }
    setListDay(itemListDay);
    const tempDay =
      selectedDayIndex > -1
        ? listDay[selectedDayIndex]
        : moment(selectedDate, 'DD/MM/YYYY').format('DD');

    const selectedDayIndexTemp = itemListDay?.findIndex(d => d === tempDay);

    setSelectedDayIndex(selectedDayIndexTemp > -1 ? selectedDayIndexTemp : 0);
    onChange?.(
      moment({
        year: parseInt(listYear[selectedYearIndex]),
        month: parseInt(listMonth[selectedMonthIndex]) - 1,
        date: parseInt(
          itemListDay[selectedDayIndexTemp > -1 ? selectedDayIndexTemp : 0],
        ),
      }).toDate(),
    );
  }, [selectedMonthIndex, selectedYearIndex, selectedDate, onChange]);
  return (
    <View style={styles.container}>
      <ScrollPicker
        dataSource={listDay}
        selectedIndex={selectedDayIndex}
        selectedData={listDay[selectedDayIndex]}
        onValueChange={(data, selectedIndex) => {
          setSelectedDayIndex(selectedIndex);
          onChange?.(
            new Date(
              parseInt(listYear[selectedYearIndex]),
              parseInt(listMonth[selectedMonthIndex]) - 1,
              parseInt(listDay[selectedIndex]),
            ),
          );
        }}
        wrapperHeight={styles.container.height}
        wrapperWidth={styles.wrapperWidth.width}
        wrapperBackground={Colors.transparent}
        wrapperActiveBackground={Colors.greyF7}
        itemHeight={styles.itemHeight.height}
        highlightColor={Colors.transparent}
      />
      <ScrollPicker
        dataSource={listMonth}
        selectedIndex={selectedMonthIndex}
        selectedData={listMonth[selectedMonthIndex]}
        onValueChange={(data, selectedIndex) => {
          setSelectedMonthIndex(selectedIndex);
        }}
        wrapperHeight={styles.container.height}
        wrapperWidth={styles.wrapperWidth.width}
        wrapperBackground={Colors.transparent}
        wrapperActiveBackground={Colors.greyF7}
        itemHeight={styles.itemHeight.height}
        highlightColor={Colors.transparent}
      />
      <ScrollPicker
        dataSource={listYear}
        selectedData={listYear[selectedYearIndex]}
        selectedIndex={selectedYearIndex}
        onValueChange={(data, selectedIndex) => {
          setSelectedYearIndex(selectedIndex);
        }}
        wrapperHeight={styles.container.height}
        wrapperWidth={styles.wrapperWidth.width}
        wrapperBackground={Colors.transparent}
        wrapperActiveBackground={Colors.greyF7}
        itemHeight={styles.itemHeight.height}
        highlightColor={Colors.transparent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 135,
  },
  wrapperWidth: {
    width: '30%',
  },
  wrapperBackground: {
    backgroundColor: Colors.white,
  },
  itemHeight: {
    height: 45,
  },
  highlightBorderWidth: {
    borderWidth: 1,
  },
});
export default React.memo(DatePicker);
