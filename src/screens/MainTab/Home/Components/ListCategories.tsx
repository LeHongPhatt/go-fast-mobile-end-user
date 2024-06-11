import { ImageCus, TextCus, TouchCus, ViewCus } from 'components';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import styles from './styles';
import { NavigationService, Routes } from 'navigation';
import { ICategory } from 'types';
import { Images } from 'assets';
import { getImage } from 'utils';
interface IProps {
  categories: ICategory[];
}

const ListCategories: React.FC<IProps> = ({ categories }) => {
  const onPressCategoryItem = useCallback(() => {
    NavigationService.navigate(Routes.Categories);
  }, []);
  const renderItem = useCallback(
    ({ item, index }: { item: ICategory; index: number }) => {
      const { name } = item;
      const defaultIcon = Images[`${item?.defaultIcon}`];
      return (
        <TouchCus
          key={index}
          style={styles.flex025}
          items-center
          mb-16
          onPress={item?.onPress ?? onPressCategoryItem}>
          <ViewCus>
            <ViewCus items-center>
              <ViewCus
                bg-pinkShadow45
                br-40
                h-52
                w-52
                t-5
                style={[styles.positionAb]}></ViewCus>
              <ImageCus
                source={
                  item.icon
                    ? { uri: getImage({ image: item.icon }) }
                    : defaultIcon
                }
                style={styles.categoryImage}
                resizeMode="contain"
              />
            </ViewCus>
            <ViewCus>
              <TextCus bold color-black22 textAlign="center">
                {name}
              </TextCus>
            </ViewCus>
          </ViewCus>
        </TouchCus>
      );
    },
    [onPressCategoryItem],
  );
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  return (
    <ViewCus px-4>
      <FlatList
        data={categories}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />
    </ViewCus>
  );
};
export default ListCategories;
