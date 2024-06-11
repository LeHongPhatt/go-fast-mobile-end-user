import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { RoutineLocaltion, TextCus, TouchCus, ViewCus } from 'components';
import styles from './styles';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { getWidthBySpace } from 'utils';
import { useGeo } from 'hooks';
import { useEffect, useState } from 'react';
import { IOrderDetail } from 'types';

interface IProps {
  orderDetailData?: IOrderDetail | null;
  onCancel: () => void;
  onSubmit: () => void;
}

const FindDriver: React.FC<IProps> = props => {
  //#region Static
  const { onNameByLatLng } = useGeo();
  //#endregion

  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');

  useEffect(() => {
    if (props.orderDetailData) {
      onNameByLatLng(
        {
          latitude: props.orderDetailData.restaurant.location.lat,
          longitude: props.orderDetailData.restaurant.location.long,
        },
        rs => {
          if (rs) setFromName(rs);
        },
      );
      onNameByLatLng(
        {
          latitude: props.orderDetailData.customer.lat,
          longitude: props.orderDetailData.customer.long,
        },
        rs => {
          if (rs) setToName(rs);
        },
      );
    }
  }, [props.orderDetailData]);
  return (
    <>
      <Icon.AccountCicle />
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

      <ViewCus pl-16 pr-16 f-1 flexGrow-1 style={[styles.w100]}>
        <BottomSheetScrollView>
          <RoutineLocaltion
            style={[styles.w100]}
            from={fromName}
            to={toName}
            titleNote="Ghi chú"
            note={props.orderDetailData?.note}
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
