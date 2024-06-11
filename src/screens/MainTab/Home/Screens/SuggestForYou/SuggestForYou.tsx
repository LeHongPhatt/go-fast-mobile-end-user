import { HomeLayout, Nodata, RNFlatList, ViewCus } from 'components';
import { useIsRendered, useListSuggestForYou } from 'hooks';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { Colors } from 'theme';
import { ENodata } from 'types';
import { useCart } from 'context/CartContext';
import { NavigationService, Routes } from 'navigation';
import { SkeletonLoadingItem, SuggestRestaurantItem } from '../../Components';
import { useIsFocused } from '@react-navigation/native';

const SuggestForYou: React.FC = () => {
  const { listData, refreshData, isLoading, fetchData } =
    useListSuggestForYou();
  const { setSelectedRestaurant } = useCart();

  const isFocused = useIsFocused();
  const isRendered = useIsRendered();

  const renderItem = useCallback(info => {
    return (
      <SuggestRestaurantItem
        key={info.index}
        {...info.item}
        onPress={() => {
          setSelectedRestaurant(info.item.id);
          NavigationService.navigate(Routes.RestaurantDetail, {
            restaurantId: info.item.id,
            distance: info.item.distance,
          });
        }}
        loading={isLoading}
      />
    );
  }, []);

  useEffect(() => {
    if (isRendered && isFocused) {
      refreshData();
    }
  }, [isFocused]);

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        iconColor: Colors.white,
        title: 'home.title_porposed',
      }}>
      <ViewCus f-1 bg-white>
        <RNFlatList
          ListEmptyComponent={
            isLoading ? <></> : <Nodata iconName={ENodata.NODATA_FOOD} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              title="Kéo thả làm mới"
              onRefresh={refreshData}
            />
          }
          onEndReached={() => {
            if (!isLoading) {
              fetchData();
            }
          }}
          data={listData}
          renderItem={renderItem}
          ListFooterComponent={isLoading ? <SkeletonLoadingItem /> : <></>}
        />
      </ViewCus>
    </HomeLayout>
  );
};

export default SuggestForYou;
