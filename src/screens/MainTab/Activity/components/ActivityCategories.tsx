import { RNFlatList, TextCus, TouchCus, ViewCus } from 'components';
import { useHome } from 'hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ListRenderItem, FlatList, StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { ICategory } from 'types';

interface IProps {
  onActiveSelected?: (category: ICategory) => void;
}

const ActivityCategories: React.FC<IProps> = props => {
  const { listCategories } = useHome();
  const flatListRef = useRef<FlatList>(null);
  const [actived, setActived] = useState<ICategory | null>(null);
  const onChooseActivity = useCallback((item: ICategory, index) => {
    setActived(item);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index === 0 ? 0 : index - 1,
    });
  }, []);
  const renderItem: ListRenderItem<ICategory> = useCallback(
    ({ item, index }) => {
      if (!actived) return <></>;
      return (
        <TouchCus
          key={index}
          style={[
            styles.categoryItem,
            actived.id === item?.id && { borderColor: Colors.main },
          ]}
          onPress={() => onChooseActivity(item, index)}>
          <TextCus
            heading5
            regular
            color={actived.id === item?.id ? Colors.main : Colors.grey85}>
            {item.name}
          </TextCus>
        </TouchCus>
      );
    },
    [onChooseActivity, actived],
  );

  useEffect(() => {
    if (!actived && listCategories.length > 0) {
      setActived(listCategories[0]);
    }
  }, [listCategories, actived]);

  useEffect(() => {
    if (actived) {
      props.onActiveSelected?.(actived);
    }
  }, [actived]);
  return (
    <ViewCus mb-16>
      <RNFlatList
        ref={flatListRef}
        data={listCategories}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        horizontal
      />
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  content: {
    paddingLeft: 14,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.greyAD,
    marginRight: 12,
    marginTop: 12,
    borderRadius: 100,
  },
});
export default ActivityCategories;
