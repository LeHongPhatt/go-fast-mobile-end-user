import { IconName } from 'assets';
import {
  TouchCus,
  ImageCus,
  CarouselHorizontal,
  IconApp,
  TextCus,
  ViewCus,
} from 'components';
import { useCart } from 'context/CartContext';
import { useHome, useLocation } from 'hooks';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { IRestaurant, ISuggestRestaurant } from 'types';
import { formatDistanceKm, getImage, width } from 'utils';
interface IProps {}
const SuggestionForYou: React.FC<IProps> = () => {
  const { locationUser } = useLocation();
  const { listSuggests, reloadSuggestHome } = useHome();
  const { setSelectedRestaurant } = useCart();
  const onPressItem = useCallback((item: IRestaurant) => {
    setSelectedRestaurant(item.id);
    NavigationService.navigate(Routes.RestaurantDetail, {
      restaurantId: item.id,
      distance: item?.distance,
    });
  }, []);
  const renderItem = useCallback(({ item, index }) => {
    const {
      id,
      avatar,
      average_rating,
      total_reviews,
      name,
      distance,
    }: ISuggestRestaurant = item;
    return (
      <TouchCus
        onPress={() => onPressItem(item)}
        key={`${id}_${index}`}
        style={styles.itemImage}>
        <ImageCus
          source={{
            uri: getImage({ image: avatar }),
          }}
          style={styles.imagePromotion}
          resizeMode="cover"
        />
        <ViewCus style={styles.tag}>
          <IconApp name={IconName.Tag} size={60} color={Colors.main} />
          <TextCus subhead color-white bold style={styles.conent}>
            PROMO
          </TextCus>
        </ViewCus>
        <ViewCus p-8>
          <TextCus medium style={styles.lineH} mb-4>
            {name}
          </TextCus>
          <ViewCus flex-row items-center>
            <IconApp name={IconName.Start} size={16} color={Colors.yellowF8} />
            <TextCus color-grey82 pl-5>
              {average_rating} ({total_reviews})
            </TextCus>
            <TextCus px-5 color-grey82>
              |
            </TextCus>
            <TextCus color-grey82>{formatDistanceKm(distance)} km</TextCus>
          </ViewCus>
        </ViewCus>
      </TouchCus>
    );
  }, []);

  useEffect(() => {
    reloadSuggestHome();
  }, [locationUser]);

  return (
    <CarouselHorizontal
      data={listSuggests}
      title={'home.title_porposed'}
      onPress={() => NavigationService.navigate(Routes.SuggestForYou)}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
    />
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 166,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemImage: {
    ...BaseStyle.boxShadow,
    position: 'relative',
    width: width / 2 - 22,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    marginRight: 16,
  },
  tag: {
    position: 'absolute',
    left: -2,
    top: -6,
  },
  conent: {
    position: 'absolute',
    left: 8,
    top: 15,
  },
  lineH: {
    lineHeight: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    overflow: 'visible',
    marginVertical: 12,
    backgroundColor: Colors.white,
  },
});
export default SuggestionForYou;
