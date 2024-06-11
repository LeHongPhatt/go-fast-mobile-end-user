import {
  Buttons,
  RNFlatList,
  HomeLayout,
  Radio,
  TextCus,
  ViewCus,
} from 'components';
import React, { useCallback, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors } from 'theme';
const DATA_PAYMENT = [
  {
    id: 0,
    title: 'Viettel Money',
    subtitle: 'Thanh toán bằng Viettel Money',
  },
  {
    id: 1,
    title: 'Thanh toán tiền mặt',
    subtitle: 'Thanh toán khi nhận hàng',
  },
];
const MethodPayment: React.FC = () => {
  const [choose, setChoose] = useState<number>(-1);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ViewCus
          key={index}
          flex-row
          justify-space-between
          mx-16
          mt-12
          pb-12
          bbw-1
          bbc-greyEF>
          <ViewCus flex-column>
            <TextCus bold>{item.title}</TextCus>
            <TextCus color-grey85>{item.subtitle}</TextCus>
          </ViewCus>
          <Radio
            chooseId={item.id}
            choosed={choose}
            onChoosed={value => setChoose(value)}
          />
        </ViewCus>
      );
    },
    [choose, setChoose],
  );
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'category.title_payment_header',
        iconColor: Colors.white,
      }}>
      <ViewCus f-1>
        <RNFlatList data={DATA_PAYMENT} renderItem={renderItem} />
        <Buttons textBtn="Chọn" mx-16 style={styles.btn} />
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  btn: {
    ...Platform.select({
      android: {
        marginBottom: 10,
      },
      ios: {
        marginBottom: 30,
      },
    }),
    borderRadius: 6,
  },
});
export default MethodPayment;
