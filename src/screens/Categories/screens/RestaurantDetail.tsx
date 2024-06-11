import { RouteProp, useRoute } from '@react-navigation/native';
import {
  Buttons,
  IconApp,
  RNFlatList,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { useCategories, useHome } from 'hooks';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated';
import { Colors } from 'theme';
import { EStatusBar, IFood, IFoodCatalog } from 'types';
import { dataDefaults, getImage, width } from 'utils';
import {
  CategoryItem,
  FoodForYou,
  FoodInfo,
  FoodPromotion,
} from '../components';
import { IconName } from 'assets';
import { useCart } from 'context/CartContext';
import { useListFood } from 'hooks/useListFood';
const AnimatedTouch = Animated.createAnimatedComponent(TouchCus);
const HEIGHT_IMAGE = 220;
const RestaurantDetail: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RestaurantDetail'>>();
  const [height, setHeight] = useState(0);
  const { orderItems: carts } = useCart();
  const {
    getDetailRestaurant,
    getListFoodCatalog,
    detailRestaurant,
    listFoodCatalog,
  } = useCategories();
  const { listPromotions, getListPromotions } = useHome();
  const { listFoodData, refreshFoodData, isLoading, fetchFoodData } =
    useListFood();

  useEffect(() => {
    getDetailRestaurant(route.params?.restaurantId);
    getListFoodCatalog(route.params?.restaurantId);
  }, [route.params.restaurantId, getListFoodCatalog, getDetailRestaurant]);

  useEffect(() => {
    if (listFoodCatalog?.length === 0) {
      return;
    }

    refreshFoodData(route.params.restaurantId);
  }, [route.params.restaurantId, listFoodCatalog]);

  useEffect(() => {
    if (route.params?.restaurantId && getListPromotions) {
      getListPromotions(route.params.restaurantId);
    }
  }, [route.params?.restaurantId, getListPromotions]);

  const listFoodCatalogs = useMemo(() => {
    return [
      {
        food_catalog_name: 'Tất cả',
        id: '',
        desc: '',
        restaurant_id: '',
      },
      ...listFoodCatalog,
    ];
  }, [listFoodCatalog]);

  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandle = useScrollViewOffset(aref);
  const backgroundColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollHandle.value,
      [0, HEIGHT_IMAGE / 3],
      [Colors.transparent, Colors.white],
    );
    return {
      backgroundColor: color,
    };
  });
  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollHandle.value,
      [0, HEIGHT_IMAGE / 4, HEIGHT_IMAGE / 2],
      [0, 0.8, 1],
      'clamp',
    );
    return {
      opacity,
    };
  });
  const hideOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollHandle.value,
      [0, HEIGHT_IMAGE / 4, HEIGHT_IMAGE / 2],
      [1, 0.5, 0],
      'clamp',
    );
    return {
      opacity,
    };
  });
  const onGoBack = useCallback(() => {
    NavigationService.goBack();
  }, []);
  const scrollOffset = useSharedValue(0);
  const onGetHeight = useCallback((h: number) => {
    setHeight(h);
  }, []);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
      if (event.contentOffset.y > 0) {
        runOnJS(onGetHeight)(1);
      } else {
        runOnJS(onGetHeight)(0);
      }
    },
  });
  const onChooseCatalogFood = useCallback(
    item => {
      refreshFoodData(route.params.restaurantId, item);
    },
    [route.params?.restaurantId],
  );

  return (
    <ViewCus f-1 bg-white>
      <StatusBar barStyle={height > 0 ? EStatusBar.DARK : EStatusBar.LIGHT} />
      <ViewCus style={[styles.wrapperImage]}>
        <Animated.Image
          source={{
            uri: getImage({
              image: detailRestaurant?.avatar,
            }),
          }}
          style={styles.image}
        />
      </ViewCus>
      <Animated.View style={[styles.header, headerOpacity]}>
        <ViewCus style={styles.boxShadow}>
          <ViewCus style={[styles.actionHeader, styles.flexStart]}>
            <AnimatedTouch
              onPress={onGoBack}
              style={[
                styles.coverIcon,
                { backgroundColor: Colors.transparent },
              ]}>
              <IconApp
                name={IconName.ChevronLeft}
                size={16}
                color={Colors.black3A}
              />
            </AnimatedTouch>
            <TextCus bold heading5 ml-8>
              {detailRestaurant?.name}
            </TextCus>
          </ViewCus>
        </ViewCus>
      </Animated.View>
      <Animated.View style={styles.actionHeader}>
        <AnimatedTouch
          onPress={onGoBack}
          style={[styles.coverIcon, hideOpacity]}>
          <IconApp name={IconName.ChevronLeft} size={16} color={Colors.white} />
        </AnimatedTouch>
        <AnimatedTouch
          onPress={onGoBack}
          style={[styles.coverIcon, hideOpacity]}>
          <IconApp name={IconName.Search} size={16} color={Colors.white} />
        </AnimatedTouch>
      </Animated.View>
      <Animated.ScrollView
        ref={aref}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <ViewCus style={styles.flexEmpty} />
        <FoodInfo
          promotionNumber={listPromotions.length}
          name={detailRestaurant?.name}
          rating={detailRestaurant?.average_rating ?? 0}
          review={detailRestaurant?.total_reviews ?? 0}
        />
        <ViewCus style={styles.content}>
          <FoodPromotion foods={listFoodData?.slice(0, 5)} />
          <TextCus heading5 px-16 useI18n>
            category.for_you
          </TextCus>
          <FoodForYou
            data={listFoodCatalogs as IFoodCatalog[]}
            onChooseCatalogFood={onChooseCatalogFood}
          />
          <RNFlatList
            data={isLoading ? dataDefaults : listFoodData}
            renderItem={({ item, index }: { item: IFood; index: number }) => (
              <CategoryItem
                onPress={() =>
                  NavigationService.navigate(Routes.ExtraFood, {
                    foodId: item?.id,
                  })
                }
                isDetail
                key={index}
                {...item}
                name={item?.food_name ?? ''}
                avatar={item.images?.[0]}
                basePrice={item?.base_price}
                loading={isLoading}
              />
            )}
            onEndReached={() => {
              if (!isLoading) {
                fetchFoodData(route.params.restaurantId);
              }
            }}
            onEndReachedThreshold={0.7}
          />
        </ViewCus>
      </Animated.ScrollView>

      {carts?.length > 0 && (
        <ViewCus
          flex-row
          justify-space-between
          items-center
          px-16
          bg-white
          btw-1
          pt-12
          pb-30
          btc-greyEE>
          <ViewCus flex-row items-center mr-24 style={styles.cart}>
            <IconApp name={IconName.CartFood} size={20} color={Colors.white} />
            <ViewCus style={styles.circle}>
              <TextCus bold>
                {carts?.reduce((prev, cart) => cart.quantity + prev, 0)}
              </TextCus>
            </ViewCus>
          </ViewCus>
          <Buttons
            textBtn="Thanh toán"
            style={styles.btnAddFood}
            onPress={() =>
              NavigationService.navigate(Routes.CartOrder, {
                title: detailRestaurant?.name,
                distance: route?.params?.distance,
              })
            }
          />
        </ViewCus>
      )}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  coverIcon: {
    width: 30,
    height: 30,
    backgroundColor: Colors.blackShadow04,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionHeader: {
    position: 'absolute',
    ...Platform.select({
      android: {
        top: 15,
      },
      ios: {
        top: 60,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  btnAddFood: {
    flex: 1,
    borderRadius: 8,
  },
  circle: {
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  cart: {
    justifyContent: 'space-between',
    backgroundColor: Colors.blue47,
    borderRadius: 37,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  contentContainer: {
    flexGrow: 1,
    overflow: 'visible',
    backgroundColor: Colors.transparent,
  },
  wrapperImage: {
    position: 'relative',
  },
  image: {
    height: HEIGHT_IMAGE,
    width,
    position: 'absolute',
  },
  bgCover: {
    position: 'absolute',
    width,
    height: HEIGHT_IMAGE,
    zIndex: 1,
  },
  flexEmpty: {
    height: HEIGHT_IMAGE / 1.8,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    position: 'absolute',
    zIndex: 2,
    ...Platform.select({
      android: {},
      ios: {
        top: 0,
      },
    }),
    backgroundColor: Colors.white,
  },
  boxShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: Colors.white,
    width,
    paddingHorizontal: 16,
    ...Platform.select({
      android: {
        height: 60,
      },
      ios: {
        height: 105,
      },
    }),
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
});
export default RestaurantDetail;
