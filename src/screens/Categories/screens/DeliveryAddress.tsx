import React from 'react';
import { HomeLayout, TextCus, ViewCus } from 'components';
import { Colors } from 'theme';

interface IProps {}

const DeliveryAddress: React.FC<IProps> = () => {
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'category.delivery_address',
      }}>
      <ViewCus>
        <TextCus>Huy</TextCus>
      </ViewCus>
    </HomeLayout>
  );
};
export default DeliveryAddress;
