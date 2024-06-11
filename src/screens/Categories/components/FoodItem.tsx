import { TextCus, ViewCus } from 'components';
import React from 'react';

interface IProps {}

const FoodItem: React.FC<IProps> = () => {
  return (
    <ViewCus>
      <TextCus>FoodItem</TextCus>
    </ViewCus>
  );
};

export default FoodItem;
