import { TextCus, TouchCus, ViewCus } from 'components';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FlatList, View } from 'react-native';
import { Colors } from 'theme';
import styles from './styles';
interface ITab {
  label: string;
  contentTab: ReactNode;
}
interface IProps {
  active?: number;
  useI18n?: boolean;
  data: ITab[];
}
const TabCus: React.FC<IProps> = ({ data, active = 0, useI18n = false }) => {
  const [activeTab, setActiveTab] = useState(active);
  const scrollRef = useRef<FlatList>(null);

  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={[styles.fullscreen]}>{item?.contentTab ?? null}</View>
      );
    },
    [activeTab],
  );

  const renderTitleTab = useCallback(() => {
    return data?.map((e, i) => (
      <TouchCus
        key={`${i}`}
        style={styles.flex1}
        onPress={() => {
          setActiveTab(i);
          scrollRef?.current?.scrollToIndex({ index: i });
        }}>
        <ViewCus
          py-8
          style={[
            styles.cenItemvh,
            activeTab === i ? styles.tabSelected : styles.tabUnselected,
          ]}>
          <TextCus
            heading5
            useI18n={useI18n}
            color={activeTab === i ? Colors.main : Colors.grey85}>
            {e.label}
          </TextCus>
        </ViewCus>
      </TouchCus>
    ));
  }, [activeTab]);
  const handleScroll = useCallback(event => {
    const currentIndex = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setActiveTab(currentIndex);
  }, []);
  return (
    <>
      <ViewCus px-16 style={[styles.row]}>
        {renderTitleTab()}
      </ViewCus>
      <FlatList
        horizontal
        data={data}
        ref={scrollRef}
        scrollEnabled
        pagingEnabled
        bounces={false}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}
      />
    </>
  );
};

export default TabCus;
