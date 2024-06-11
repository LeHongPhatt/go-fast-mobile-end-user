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
import { Colors } from 'theme';

interface IProps {
  limit?: Number;
}

const SkeletonLoadingItem: React.FC<IProps> = ({ limit = 5 }) => {
  return (
    <>
      {Array(limit)
        .fill(1)
        .map((_, index) => (
          <Skeleton.Group show={true} key={index}>
            <TouchCus p-16 flex-row onPress={() => {}}>
              <ViewCus style={styles.wrapperImage}>
                <AppSkeleton height={88} width={88}>
                  <ImageCus source={Images.defaultStore} style={styles.image} />
                </AppSkeleton>
                <ViewCus style={styles.tag}>
                  <IconApp
                    name={IconName.Tag}
                    size={50}
                    color={Colors.yellowF8}
                  />
                  <TextCus caption color-white bold style={styles.conent}>
                    PROMO
                  </TextCus>
                </ViewCus>
              </ViewCus>
              <ViewCus f-1 ml-14 style={[]}>
                <AppSkeleton height={20}>
                  <TextCus bold heading5 numberOfLines={1} />
                </AppSkeleton>
                <MotiView animate={{ opacity: 1 }} style={styles.heighter} />
                <AppSkeleton>
                  <ViewCus flex-row items-center>
                    <IconApp
                      name={IconName.Start}
                      size={16}
                      color={Colors.yellowF8}
                    />
                    <TextCus color-grey82 pl-5 />
                    <TextCus px-5 color-grey82>
                      |
                    </TextCus>
                    <TextCus color-grey82 />
                  </ViewCus>
                </AppSkeleton>
              </ViewCus>
            </TouchCus>
            <Divider medium />
          </Skeleton.Group>
        ))}
    </>
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
export default SkeletonLoadingItem;
