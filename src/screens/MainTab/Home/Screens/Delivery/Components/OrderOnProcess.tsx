import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import {
  Card,
  RoutineLocaltion,
  RoutineStep,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { Colors } from 'theme';
import { IOrderDetail } from 'types';
// import { useCategories } from 'hooks';
// import { useEffect } from 'react';
import { STEP_DATA, formatMoney, getWidthBySpace } from 'utils';
import styles from './styles';
import { useGeo } from 'hooks';

interface IProps {
  orderDetailData?: IOrderDetail | null;
  onCancel: () => void;
}

const OrderOnProcess: React.FC<IProps> = props => {
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

  if (!props.orderDetailData) {
    return <></>;
  }
  return (
    <ViewCus flex-1 flex-column flexGrow-1 style={[styles.w100]}>
      <BottomSheetScrollView>
        <ViewCus p-16>
          <TextCus heading4 bold useI18n>
            delivery.onProcessing
          </TextCus>
        </ViewCus>
        <ViewCus p-16 flex-row justify-space-between items-center>
          <ViewCus flex-row>
            <TextCus
              useI18n
              mainSize
              style={{
                color: Colors.grey85,
              }}>
              delivery.orderIsSending
            </TextCus>
            <TextCus
              mainSize
              style={{
                color: Colors.grey85,
              }}>
              ...
            </TextCus>
          </ViewCus>
          <TouchCus onPress={props.onCancel}>
            <TextCus
              useI18n
              mainSize
              style={{
                color: Colors.success,
              }}>
              action.cancel
            </TextCus>
          </TouchCus>
        </ViewCus>

        <ViewCus items-center p-6 p-16>
          <RoutineStep keyValue={2} listData={STEP_DATA} />
        </ViewCus>

        <Card hasShadow={true} mt-40 mr-16 ml-16 style={styles.boxShadow}>
          <ViewCus>
            <ViewCus>
              <TextCus mainSize bold color={Colors.black3A}>
                {props.orderDetailData?.restaurant?.name}
              </TextCus>
            </ViewCus>

            <ViewCus flex-row justify-space-between>
              <ViewCus flex-row>
                <TextCus mainSize color={Colors.grey85} useI18n>
                  delivery.totalMoney
                </TextCus>
                <TextCus mainSize color={Colors.grey85}>
                  :
                </TextCus>
              </ViewCus>

              <TextCus heading5 bold color={Colors.main}>
                {formatMoney(props.orderDetailData?.order_price)}
              </TextCus>
            </ViewCus>

            <ViewCus flex-row justify-space-between>
              <TextCus mainSize color={Colors.grey85} />

              <TextCus
                heading5
                bold
                color={Colors.grey85}
                style={{
                  textDecorationLine: 'line-through',
                }}>
                {formatMoney(props.orderDetailData?.discount_order)}
              </TextCus>
            </ViewCus>
            <ViewCus mt-12>{Icon.Line(getWidthBySpace(32))}</ViewCus>

            {/* List item in order */}
            <ViewCus>
              {props.orderDetailData.order_items.map((itemData, index) => {
                return (
                  <ViewCus key={index} mt-12 flex-row justify-space-between>
                    <ViewCus flex-row>
                      <TextCus mainSize bold mr-4 color={Colors.black3A}>
                        {itemData.quantity}x
                      </TextCus>
                      <TextCus mainSize color={Colors.black3A}>
                        {itemData.item_name}
                      </TextCus>
                    </ViewCus>

                    <TextCus mainSize color={Colors.grey85}>
                      {formatMoney(itemData.price)}
                    </TextCus>
                  </ViewCus>
                );
              })}
            </ViewCus>
            {/* End list item in order */}
          </ViewCus>
        </Card>

        <Card mt-12 mr-16 ml-16 hasShadow={true}>
          <RoutineLocaltion
            style={[styles.w100]}
            from={fromName}
            to={toName}
            note={props.orderDetailData?.note}
          />
        </Card>
      </BottomSheetScrollView>
    </ViewCus>
  );
};

export default OrderOnProcess;
