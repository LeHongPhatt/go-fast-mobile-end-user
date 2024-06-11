import { Images } from 'assets';
import { CarouselHorizontal, ImageCus, TouchCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { IPromotion } from 'types';
interface IProps {
  promotions: IPromotion[];
}
const AttractiveOffers: React.FC<IProps> = ({ promotions }) => {
  const onPressItem = useCallback(() => {
    NavigationService.navigate(Routes.Categories);
  }, []);
  const renderItem = useCallback(() => {
    return (
      <TouchCus onPress={onPressItem} style={[styles.mr5]}>
        <ImageCus
          source={Images.banner}
          style={styles.imagePromotion}
          resizeMode="cover"
        />
      </TouchCus>
    );
  }, [promotions]);
  return (
    <CarouselHorizontal
      data={promotions}
      title={'home.title_promotion'}
      onPress={() => NavigationService.navigate(Routes.Promotion)}
      renderItem={renderItem}
    />
  );
};
const styles = StyleSheet.create({
  mr5: {
    marginHorizontal: 10,
  },
  imagePromotion: {
    height: 167,
    width: 319,
  },
});
export default AttractiveOffers;
