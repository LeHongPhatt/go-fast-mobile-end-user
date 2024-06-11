import React from 'react';
import { IconApp, ImageCus, TextCus, TouchCus, ViewCus } from 'components';
import { IconName } from 'assets';
import { BaseStyle, Colors } from 'theme';
import { StyleSheet } from 'react-native';
import { formatMoney, getImage } from 'utils';
import { NavigationService, Routes } from 'navigation';
interface IProps {
  quantity: number;
  price: number;
  note: string;
  extraFood: any[];
  itemName: string;
  image: string;
  itemId: string;
  index: number;
  extraOptions: any[];
}

const CategoryCartItem: React.FC<IProps> = ({
  quantity,
  price,
  note,
  extraFood,
  itemName,
  image,
  itemId,
  index,
}) => {
  return (
    <ViewCus style={styles.orderItem}>
      <ImageCus
        source={{
          uri: getImage({
            image,
          }),
        }}
        style={styles.image}
      />
      <ViewCus
        style={[BaseStyle.flexShrink1, BaseStyle.flex1, styles.spaceBetween]}
        ml-10>
        <TextCus>{`${quantity}x ${itemName}`}</TextCus>
        <TextCus caption color-grey85>
          Chọn size: Size vừa
        </TextCus>
        {extraFood?.length > 0 && (
          <TextCus caption color-grey85>
            Món thêm:{' '}
            {extraFood?.map(item => item.extra_option_name).join(', ')}
          </TextCus>
        )}
        {note && <TextCus caption>Ghi chú: {note}</TextCus>}
        <TextCus main bold>
          {formatMoney(price)}
        </TextCus>
      </ViewCus>
      <TouchCus
        onPress={() => {
          NavigationService.navigate(Routes.ExtraFood, {
            foodId: itemId,
            index,
          });
        }}>
        <IconApp name={IconName.Edit} color={Colors.grey85} size={20} />
      </TouchCus>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 79,
    height: 79,
    borderRadius: 8,
  },
  orderItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyEF,
    marginHorizontal: 14,
    paddingBottom: 14,
    marginTop: 14,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
export default CategoryCartItem;
