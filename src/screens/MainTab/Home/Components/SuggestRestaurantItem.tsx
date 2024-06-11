import { IconName, Images } from 'assets';
import {
  AppSkeleton,
  Divider,
  IconApp,
  ImageCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { ISuggestRestaurant } from 'types';
import { formatDistanceKm, formatMoney, getImage } from 'utils';

interface IProps extends ISuggestRestaurant {
  onPress: () => void;
  isDetail?: boolean;
  price?: number;
  order_count?: number;
  basePrice?: number;
  loading: boolean;
}

const SuggestRestaurantItem: React.FC<IProps> = ({
  onPress,
  isDetail,
  name,
  distance,
  avatar,
  total_reviews,
  average_rating,
  price,
  order_count,
  basePrice,
  loading,
}) => {
  return (
    <Skeleton.Group show={loading}>
      <TouchCus p-16 flex-row onPress={onPress}>
        <ViewCus style={styles.wrapperImage}>
          <AppSkeleton height={88} width={88}>
            <ImageCus
              source={
                avatar
                  ? { uri: getImage({ image: avatar }) }
                  : Images.defaultStore
              }
              style={styles.image}
            />
          </AppSkeleton>
          <ViewCus style={styles.tag}>
            <IconApp name={IconName.Tag} size={50} color={Colors.yellowF8} />
            <TextCus caption color-white bold style={styles.conent}>
              PROMO
            </TextCus>
          </ViewCus>
        </ViewCus>
        <ViewCus f-1 ml-14 style={[isDetail && styles.spacingBetween]}>
          <AppSkeleton height={20}>
            <TextCus bold heading5 numberOfLines={1}>
              {name}
            </TextCus>
          </AppSkeleton>
          <MotiView
            animate={{ opacity: loading ? 1 : 0 }}
            style={styles.heighter}
          />
          {isDetail ? (
            <>
              <AppSkeleton height={20}>
                <TextCus>
                  <TextCus color-grey82>Đã được đặt</TextCus>
                  <TextCus bold> {`${order_count}`} lần</TextCus>
                </TextCus>
              </AppSkeleton>
              <ViewCus flex-row>
                <AppSkeleton width={75} height={20}>
                  <TextCus mr-5 bold main>
                    {formatMoney(price!)}
                  </TextCus>
                </AppSkeleton>
                <AppSkeleton width={75} height={20}>
                  <TextCus color-grey84 style={[BaseStyle.textLineThrough]}>
                    {formatMoney(basePrice!)}
                  </TextCus>
                </AppSkeleton>
              </ViewCus>
            </>
          ) : (
            <AppSkeleton>
              <ViewCus flex-row items-center>
                <IconApp
                  name={IconName.Start}
                  size={16}
                  color={Colors.yellowF8}
                />
                <TextCus color-grey82 pl-5>
                  {average_rating} ({`${total_reviews}`})
                </TextCus>
                <TextCus px-5 color-grey82>
                  |
                </TextCus>
                <TextCus color-grey82>{`${formatDistanceKm(
                  distance,
                )} km`}</TextCus>
              </ViewCus>
            </AppSkeleton>
          )}
        </ViewCus>
      </TouchCus>
      <Divider medium />
    </Skeleton.Group>
  );
};
const styles = StyleSheet.create({
  heighter: {
    height: 8,
  },
  image: {
    height: 84,
    width: 84,
    borderRadius: 4,
  },
  wrapperImage: {
    position: 'relative',
  },
  tag: {
    position: 'absolute',
    left: -3,
    top: -6,
  },
  conent: {
    position: 'absolute',
    left: 8,
    top: 11,
  },
  spacingBetween: {
    justifyContent: 'space-between',
  },
});
export default SuggestRestaurantItem;
