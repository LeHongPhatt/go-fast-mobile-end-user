import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { RoutineLocaltion, TextCus, TouchCus, ViewCus } from 'components';
import styles from './styles';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { getWidthBySpace } from 'utils';
import { useGeo } from 'hooks';
import { useEffect, useState } from 'react';

interface IProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const FindDriver: React.FC<IProps> = props => {
  const { onNameByLatLng } = useGeo();
  const [fromName, setFromName] = useState(
    '77 Hẻm Nguyễn Tất Thành, Phường 03, Quận 4',
  );
  const [toName, setToName] = useState(
    '302 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1',
  );
  useEffect(() => {
    if (props.fromToData) {
      onNameByLatLng(
        {
          latitude: props.fromToData.from.lat,
          longitude: props.fromToData.from.long,
        },
        rs => {
          setFromName(rs);
        },
      );

      onNameByLatLng(
        {
          latitude: props.fromToData.to.lat,
          longitude: props.fromToData.to.long,
        },
        rs => {
          setToName(rs);
        },
      );
    }
  }, [props.fromToData]);
  return (
    <>
      <ViewCus p-16 style={[styles.w100]}>
        <ViewCus pl-16 pt-16 style={[styleCus.containerButtonCancel]}>
          <TouchCus onPress={props.onCancel}>
            <TextCus useI18n mainSize color={Colors.grey85}>
              action.cancel
            </TextCus>
          </TouchCus>
        </ViewCus>
        <ViewCus items-center>
          <TextCus useI18n heading4 bold>
            delivery.lookingForADriver
          </TextCus>
        </ViewCus>
      </ViewCus>
      <ViewCus p-16 style={[styles.w100]}>
        <ViewCus item-center>{Icon.Line(getWidthBySpace(32))}</ViewCus>
      </ViewCus>

      <ViewCus f-1 flexGrow-1 style={[styles.w100]}>
        <BottomSheetScrollView>
          <RoutineLocaltion
            style={[styles.w100]}
            from={fromName}
            to={toName}
          />
        </BottomSheetScrollView>
      </ViewCus>
    </>
  );
};

const styleCus = StyleSheet.create({
  containerButtonCancel: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default FindDriver;
