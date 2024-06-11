import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import { ScrollPicker } from 'components/ScrollPicker';
import { Colors } from 'theme';
import { ISelectTime } from 'types';
interface Props {
  selectedTime: ISelectTime;
  addedMinutes: string | number;
  setSelectedInformation: (value) => void;
}
const TimePicker: React.FC<Props> = ({
  selectedTime,
  addedMinutes,
  setSelectedInformation,
}) => {
  const [selectedItemHour, setSelectedItemHour] = useState({
    index: selectedTime?.hour || 0,
    data: selectedTime?.hour || '12',
  });
  const [selectedItemMinute, setSelectedItemMinute] = useState({
    index: selectedTime?.minute || 0,
    data: selectedTime?.minute || '30',
  });
  const [itemListSelectHour] = useState(
    Array(24)
      .fill(null)
      .map((_, index) => {
        return index < 10 ? `0${index}` : index.toString();
      }),
  );
  const [itemListSelectMinute] = useState(
    Array(60)
      .fill(null)
      .map((_, index) => {
        return index < 10 ? `0${index}` : index.toString();
      }),
  );
  useEffect(() => {
    let inThisMoment, add90MinuteToNow;
    if (selectedTime?.hour && selectedTime?.minute) {
      inThisMoment = moment(selectedTime, 'HH:mm').format();
      add90MinuteToNow = moment(inThisMoment).add(0, 'minutes');
    } else {
      inThisMoment = moment().format();
      add90MinuteToNow = moment(inThisMoment).add(
        addedMinutes || 90,
        'minutes',
      );
    }
    const getHoursFromAdd90Minute = add90MinuteToNow.hours();
    const getMinuteFromAdd90Minute = add90MinuteToNow.minutes();

    if (!selectedTime?.hour && !selectedTime?.minute) {
      const dataHour =
        getHoursFromAdd90Minute < 10
          ? `0${getHoursFromAdd90Minute}`
          : getHoursFromAdd90Minute.toString();
      const dataMinute =
        getMinuteFromAdd90Minute < 10
          ? `0${getMinuteFromAdd90Minute}`
          : getMinuteFromAdd90Minute.toString();
      setSelectedItemHour({
        index: itemListSelectHour.indexOf(dataHour),
        data: dataHour,
      });

      setSelectedItemMinute({
        index: itemListSelectMinute.indexOf(dataMinute),
        data: dataMinute,
      });
    }
  }, [
    selectedTime?.hour,
    selectedTime?.minute,
    itemListSelectHour,
    itemListSelectMinute,
    addedMinutes,
  ]);

  useEffect(() => {
    setSelectedInformation({
      hour: selectedItemHour.data,
      minute: selectedItemMinute.data,
    });
  }, [selectedItemHour.data, selectedItemMinute.data]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollPicker
          dataSource={itemListSelectHour}
          selectedIndex={selectedItemHour.index}
          selectedData={selectedItemHour.data}
          onValueChange={(data, selectedIndex) => {
            setSelectedItemHour({ data, index: selectedIndex });
          }}
          wrapperWidth={'30%'}
          highlightBackgroundColor={Colors.grey85}
          itemHeight={48}
          wrapperHeight={135}
          highlightColor={Colors.transparent}
          highlightBorderWidth={2}
          wrapperBackground={Colors.transparent}
          wrapperActiveBackground={Colors.grey85}
        />
        <ScrollPicker
          dataSource={itemListSelectMinute}
          selectedIndex={selectedItemMinute.index}
          selectedData={selectedItemMinute.data}
          onValueChange={(data, selectedIndex) => {
            setSelectedItemMinute({ data, index: selectedIndex });
          }}
          wrapperWidth={'30%'}
          highlightBackgroundColor={Colors.grey85}
          itemHeight={48}
          wrapperHeight={135}
          highlightColor={Colors.transparent}
          highlightBorderWidth={2}
          wrapperBackground={Colors.transparent}
          wrapperActiveBackground={Colors.grey85}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: 'column',
  },
  content: {
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
  },
});
export default React.memo(TimePicker);
