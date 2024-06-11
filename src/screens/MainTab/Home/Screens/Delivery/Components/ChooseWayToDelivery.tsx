import React, { useEffect, useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { TextCus, TouchCus, ViewCus } from 'components';
import { formatMoney } from 'utils';
import styles from './styles';
import { IShippingType } from 'types';
import { useGeo } from 'hooks';

type Option = {
  fast: boolean;
  price: number;
  time: number;
  distance: number;
} & IShippingType;

interface IProps {
  initialValue?: Option;
  options: Option[];
  onCancel: () => void;
  onSubmit: (data: Option) => void;
}

const ChooseWayToDelivery: React.FC<IProps> = props => {
  const [listData, setListData] = useState(props.options);
  // const { searchDistanceMatrix } = useGeo();

  // useEffect(() => {
  //   if(listData && listData.length > 0){
  //     for (let i = 0; i < listData.length; i++) {
  //       const d = listData[i];
  //       searchDistanceMatrix()
  //     }
  //   }
  // }, [listData]);

  useEffect(() => {
    setListData(props.options);
  }, [props.options]);

  return (
    <ViewCus flex-1 flex-column flexGrow-1 style={[styles.w100]}>
      <BottomSheetScrollView>
        {listData?.map((val, index) => {
          return (
            <TouchCus
              key={index}
              flex-row
              mb-12
              px-16
              h-48
              items-center
              justify-space-between
              style={[
                styles.w100,
                val.id === props.initialValue?.id ? styles.selected : null,
              ]}
              onPress={() => {
                props.onSubmit(val);
              }}>
              <ViewCus flex-row items-center>
                <ViewCus mr-8>
                  <Icon.MotoCylce fast={val.fast} />
                </ViewCus>
                <ViewCus>
                  <TextCus>
                    Giao {val.fast ? 'nhanh' : 'chậm'} {formatMoney(val.price)}
                  </TextCus>
                </ViewCus>
              </ViewCus>
              <TextCus>
                {val.time} phút - {val.distance}km
              </TextCus>
            </TouchCus>
          );
        })}
      </BottomSheetScrollView>
    </ViewCus>
  );
};

export default ChooseWayToDelivery;
