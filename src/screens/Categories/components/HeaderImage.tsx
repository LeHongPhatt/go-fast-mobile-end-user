import { ImageCus, TouchCus, ViewCus } from 'components';
import React, {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { getImage, width } from 'utils';
interface IProps {
  setCurrentItem: Dispatch<SetStateAction<number>>;
  currentItem: number;
  images: Array<string>;
}
const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ITEM_HEIGHT = 310;
const HeaderImage: React.FC<IProps> = ({ setCurrentItem, images }) => {
  const data = [...Array(5).keys()];
  const aref = useRef<FlatList>(null);
  const [isAutoPlay] = useState(false);
  const offSet = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const interval = useRef<ReturnType<typeof setInterval>>(0);
  const onPressItem = useCallback(() => {
    console.log('item');
  }, []);
  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        if (aref.current && scrollX.value < (data.length - 1) * width) {
          offSet.value = width + scrollX.value;
          runOnJS(getCurrentIndex)(offSet.value / width + 1);
          aref.current.scrollToOffset({ offset: offSet.value, animated: true });
        } else {
          offSet.value = 0;
          aref.current?.scrollToOffset({ offset: 0, animated: true });
        }
      }, 3000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <TouchCus onPress={onPressItem} key={index}>
          <ImageCus
            source={{
              uri: getImage({
                image: item,
              }),
            }}
            style={[styles.image]}
            resizeMode="cover"
          />
        </TouchCus>
      );
    },
    [onPressItem],
  );
  const getCurrentIndex = useCallback(
    currentIndex => {
      setCurrentItem(currentIndex);
    },
    [setCurrentItem],
  );
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(
        event.contentOffset.x / event.layoutMeasurement.width,
      );
      runOnJS(getCurrentIndex)(index);
    },
  });
  return (
    <ViewCus mb-16>
      <ReanimatedFlatList
        ref={aref}
        data={images.length > 0 ? images : [1]}
        renderItem={renderItem}
        pagingEnabled={true}
        onScroll={handleScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        decelerationRate="fast"
        getItemLayout={(_, index) => {
          return {
            length: width,
            index,
            offset: width * index,
          };
        }}
      />
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  image: {
    width,
    height: ITEM_HEIGHT,
  },
});
export default memo(HeaderImage);
