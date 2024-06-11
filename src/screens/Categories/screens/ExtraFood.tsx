import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import {
  Buttons,
  CheckBox,
  IconApp,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { useCategories } from 'hooks';
import { NavigationService, RootStackParamList } from 'navigation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  InteractionManager,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
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
import { Colors, FontWeight } from 'theme';
import { EStatusBar } from 'types';
import { formatMoney, width } from 'utils';
import { HeaderImage } from '../components';
import { Skeleton } from 'moti/skeleton';
import { useCart } from 'context/CartContext';
import { useTranslation } from 'react-i18next';
const ExtraFood: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ExtraFood'>>();
  const { getExtraFood, listExtraFood, loading } = useCategories();
  const { addItemToOrder: onAddToCart, updateOrderItems: onUpdateFromCart, orderItems: carts } = useCart();
  const isUpdate = route.params?.index !== undefined;
  const cartUpdate = carts.find(cart => cart.index === route.params?.index);
  const { t } = useTranslation();
  useEffect(() => {
    getExtraFood(route.params?.foodId);
  }, [route.params?.foodId]);

  const scrollOffset = useSharedValue(0);
  const [height, setHeight] = useState(0);
  const [countValue, setCountValue] = useState(
    isUpdate ? cartUpdate?.quantity ?? 0 : 1,
  );
  const [currentItem, setCurrentItem] = useState<number>(0);
  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandle = useScrollViewOffset(aref);
  // const [desc, setDesc] = useState('');
  const [extraFood, setExtraFood] = useState<any[]>(
    cartUpdate?.extraOptions ?? [],
  );

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollHandle.value, [0, 105], [0, 1], 'clamp');
    return {
      opacity,
    };
  });
  const titleOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollHandle.value,
      [0, 220, 250],
      [0, 0, 1],
      'clamp',
    );
    return {
      opacity,
    };
  });
  const sliderOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(scrollHandle.value, [0, 105], [1, 0], 'clamp');
    return {
      opacity,
    };
  });
  const backgroundColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollHandle.value,
      [0, 105],
      [Colors.greyEF, Colors.transparent],
    );
    return {
      backgroundColor: color,
    };
  });
  const onHandleMinus = useCallback(() => {
    if (!isUpdate && countValue === 1) {
      return;
    }

    if (isUpdate && countValue === 0) {
      return;
    }

    setCountValue(prev => prev - 1);
  }, [countValue]);
  const onHandlePlus = useCallback(() => {
    setCountValue(prev => prev + 1);
  }, [countValue]);
  const renderItem = useCallback(
    item => {
      return (
        <Fragment key={item?.id}>
          <TextCus heading5>{item?.group_name}</TextCus>
          {item?.extraOptions?.map(extra => (
            <ViewCus key={extra.id} style={[styles.wrapperExtra]}>
              <CheckBox
                title={extra?.extra_option_name}
                value={!!extraFood.find(x => x.id === extra.id)}
                onChange={(checked, title) => {
                  const extraOption = item?.extraOptions.find(
                    exop => exop.extra_option_name === title,
                  );
                  if (checked) {
                    const result = { ...extraOption, checked };
                    extraFood.push(result);
                  } else {
                    setExtraFood(prev => [
                      ...prev.map(p =>
                        p.extra_option_name === title
                          ? { ...p, checked }
                          : { ...p },
                      ),
                    ]);
                  }
                }}
              />
              <TextCus bold>+{formatMoney(extra?.price)}</TextCus>
            </ViewCus>
          ))}
        </Fragment>
      );
    },
    [extraFood, route],
  );
  // const renderNoteFood = useCallback(() => {
  //   return (
  //     <TextInputs
  //       placeholder="category.note"
  //       onChangeText={setDesc}
  //       value={desc}
  //     />
  //   );
  // }, [desc]);
  const onHandleExtraFood = useCallback(() => {
    if (isUpdate) {
      const form = {
        orderItems: {
          ...cartUpdate,
          quantity: countValue,
          index: cartUpdate?.index,
        },
        extraOptions: extraFood.filter(item => item.checked),
      };
      onUpdateFromCart(form);
    } else {
      const form = {
        orderItems: {
          itemId: listExtraFood?.id,
          quantity: countValue,
          itemName: listExtraFood?.food_name,
          image: listExtraFood.images?.[0],
          price: listExtraFood.price,
        },
        extraOptions: extraFood.filter(item => item.checked),
      };
      onAddToCart(form);
    }

    InteractionManager.runAfterInteractions(() => {
      NavigationService.goBack();
    });
  }, [
    extraFood,
    countValue,
    listExtraFood?.id,
    listExtraFood?.food_name,
    onAddToCart,
    onUpdateFromCart,
  ]);
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
  return (
    <Skeleton.Group show={loading}>
      <ViewCus f-1 bg-white>
        <StatusBar barStyle={height > 0 ? EStatusBar.DARK : EStatusBar.LIGHT} />
        <Animated.View style={[styles.header, headerOpacity]}>
          <ViewCus style={styles.boxShadow} />
        </Animated.View>
        <Animated.View style={styles.actionHeader}>
          <TouchCus onPress={() => NavigationService.goBack()}>
            <Animated.View style={[styles.circle, backgroundColor]}>
              <IconApp
                name={IconName.ChevronLeft}
                size={16}
                color={Colors.black3A}
              />
            </Animated.View>
          </TouchCus>
          <Animated.Text style={[styles.title, titleOpacity]} numberOfLines={1}>
            {listExtraFood?.food_name}
          </Animated.Text>
          <Animated.View style={[styles.slider, sliderOpacity]}>
            {listExtraFood?.images?.length > 1 && (
              <>
                <TextCus heading5>{currentItem + 1}/</TextCus>
                <TextCus heading5>{listExtraFood?.images?.length}</TextCus>
              </>
            )}
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          ref={aref}
          contentContainerStyle={styles.wrapperContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}>
          <HeaderImage
            setCurrentItem={setCurrentItem}
            currentItem={currentItem}
            images={listExtraFood?.images}
          />
          <ViewCus px-16 pb-16>
            <Skeleton colorMode="light" height={24} width={'50%'}>
              <TextCus heading4 mb-12>
                {listExtraFood?.food_name}
              </TextCus>
            </Skeleton>
            <ViewCus flex-row>
              <Skeleton colorMode="light">
                <TextCus heading4 main>
                  {formatMoney(listExtraFood?.price)}
                </TextCus>
              </Skeleton>
              <TextCus color-grey82 mx-8>
                |
              </TextCus>
              <Skeleton colorMode="light">
                <TextCus
                  color-grey82
                  paramI18n={{ number: listExtraFood?.order_count }}
                  useI18n>
                  category.buy
                </TextCus>
              </Skeleton>
            </ViewCus>
          </ViewCus>
          <ViewCus h-4 bg-greyF7 />
          <ViewCus p-16>
            {listExtraFood?.extra_options_group?.map(renderItem)}
            {/* {listExtraFood?.extra_options_group?.length > 0 ? (
              <>{listExtraFood?.extra_options_group?.map(renderItem)}</>
            ) : (
              <>
                <ViewCus flex-row mb-12>
                  <IconApp
                    name={IconName.Term}
                    size={24}
                    color={Colors.greyAD}
                  />
                  <ViewCus ml-12 flex-row>
                    <TextCus heading5 useI18n mr-4>
                      category.noted
                    </TextCus>
                    <TextCus color-grey85 useI18n>
                      category.option
                    </TextCus>
                  </ViewCus>
                </ViewCus>
                {renderNoteFood()}
              </>
            )} */}
          </ViewCus>
        </Animated.ScrollView>
        <ViewCus
          flex-row
          justify-space-between
          items-center
          px-16
          bg-white
          btw-1
          pt-12
          pb-30
          btc-greyED>
          <ViewCus flex-row items-center mr-24>
            <TouchCus onPress={onHandleMinus}>
              <IconApp
                name={IconName.Minus}
                size={26}
                color={
                  !isUpdate && countValue === 1 ? Colors.disable : Colors.main
                }
              />
            </TouchCus>
            <TextCus heading2 px-16>
              {countValue}
            </TextCus>
            <TouchCus onPress={onHandlePlus}>
              <IconApp name={IconName.Plus} size={26} color={Colors.main} />
            </TouchCus>
          </ViewCus>
          <Buttons
            textBtn={
              (isUpdate ? t('title.update_menu') : t('title.add_menu')) ?? ''
            }
            style={styles.btnAddFood}
            onPress={onHandleExtraFood}
          />
        </ViewCus>
      </ViewCus>
    </Skeleton.Group>
  );
};
const styles = StyleSheet.create({
  wrapperContent: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    position: 'relative',
  },
  image: {
    width,
    height: 310,
  },
  actionHeader: {
    position: 'absolute',
    zIndex: 2,
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
  },
  slider: {
    backgroundColor: Colors.greyEF,
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  circle: {
    borderRadius: 16,
    backgroundColor: Colors.greyEF,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 16,
    flexShrink: 1,
    paddingHorizontal: 5,
    fontWeight: FontWeight.bold,
  },
  btnAddFood: {
    flex: 1,
    borderRadius: 8,
  },
  wrapperExtra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.disableEF,
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginTop: 15,
  },
  clearBottomWidth: {
    borderBottomWidth: 0,
  },
});
export default ExtraFood;
