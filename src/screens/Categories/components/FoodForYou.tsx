import { RNFlatList, TextCus, TouchCus, ViewCus } from 'components';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { IFoodCatalog } from 'types';

interface IProps {
  data: IFoodCatalog[];
  onChooseCatalogFood: (id: string) => void;
}
const FoodForYou: React.FC<IProps> = ({ data, onChooseCatalogFood }) => {
  const [active, setActive] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);
  const onPressItem = useCallback(
    (id: string, index: number) => {
      setActive(id);
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: index === 0 ? 0 : index - 1,
      });
      onChooseCatalogFood(id);
    },
    [onChooseCatalogFood],
  );
  const renderItem = useCallback(
    ({ item, index }: { item: IFoodCatalog; index: number }) => {
      const {} = item;
      return (
        <TouchCus
          key={index}
          onPress={() => onPressItem(item?.id, index)}
          style={[
            styles.wrapperItem,
            index === 0 && styles.ml16,
            active === item?.id && styles.activeItem,
          ]}>
          <TextCus style={[active === item?.id && styles.activeText]}>
            {item?.food_catalog_name}
          </TextCus>
        </TouchCus>
      );
    },
    [onPressItem, active],
  );
  return (
    <ViewCus>
      <RNFlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
      />
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  wrapperItem: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.greyE6,
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginTop: 16,
    marginRight: 8,
  },
  ml16: {
    marginLeft: 16,
  },
  activeText: {
    color: Colors.main,
  },
  activeItem: {
    borderColor: Colors.main,
  },
});
export default FoodForYou;
