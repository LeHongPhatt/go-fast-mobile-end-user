import { IconName } from 'assets';
import { RNFlatList, IconApp, TextCus, TouchCus, ViewCus } from 'components';
import React from 'react';
import { FlatListProps, ListRenderItem } from 'react-native';
import { Colors } from 'theme';
interface IProps<T> extends FlatListProps<T> {
  title?: string;
  onPress?: () => void | undefined;
  data: T[];
  renderItem: ListRenderItem<T>;
}
const CarouselHorizontal = <T extends object | number>(props: IProps<T>) => {
  const { renderItem, title, onPress, data, ...rest } = props;
  return (
    <ViewCus mb-16>
      {title && (
        <ViewCus flex-row items-center justify-space-between mb-16 px-10>
          <TextCus heading5 useI18n>
            {title}
          </TextCus>
          <TouchCus onPress={onPress!}>
            <IconApp
              name={IconName.ChevronRight}
              size={16}
              color={Colors.yellowF8}
            />
          </TouchCus>
        </ViewCus>
      )}
      <RNFlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={'fast'}
        {...rest}
      />
    </ViewCus>
  );
};
export default CarouselHorizontal;
