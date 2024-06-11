import { RNFlatList, HomeLayout } from 'components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BaseStyle, Colors } from 'theme';
import { PromotionDetail, PromotionItem } from './components';
import { IPromotion, IRefBottom } from 'types';
import { useHome } from 'hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationService, RootStackParamList } from 'navigation';

const Promotion = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Promotion'>>();
  const refModal = useRef<IRefBottom>(null);
  const { listPromotions } = useHome();
  const [selected, setSelected] = useState<IPromotion>();
  const onPressItem = useCallback(item => {
    setSelected(item);
  }, []);
  const isBackable = !!route?.params?.backPath;

  useEffect(() => {
    if (selected) {
      refModal.current?.show();
    }
  }, [selected]);

  const handleBack = useCallback(() => {
    if (isBackable) {
      NavigationService.navigate(route.params.backPath, route.params.params);
    }
  }, [route?.params?.backPath]);
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <PromotionItem
          isAppliable={isBackable}
          item={item}
          key={item.id}
          onPress={() => onPressItem(item)}
        />
      );
    },
    [onPressItem],
  );
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        onPressLeft: handleBack,
        notGoBack: !isBackable,
        title: 'bottom.promotion',
        iconColor: Colors.white,
      }}>
      <RNFlatList
        data={listPromotions}
        renderItem={renderItem}
        contentContainerStyle={BaseStyle.pd16}
      />
      <PromotionDetail
        promotion={selected}
        ref={refModal}
        onCloseModal={() => {
          refModal.current?.close();
          setSelected(undefined);
        }}
      />
    </HomeLayout>
  );
};

export default Promotion;
