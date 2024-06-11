import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import { Colors } from 'theme';
import { FontWeight } from 'theme/typography';
const deviceWidth = Dimensions.get('screen').width;
export default class ScrollPicker extends Component<any, any> {
  timer: any;
  sview: ScrollView | null | undefined;
  isScrollTo: boolean | undefined;
  dragStarted: boolean | undefined;
  momentumStarted: any;
  static defaultProps: {
    dataSource: number[];
    itemHeight: number;
    wrapperBackground: string;
    wrapperHeight: number;
    wrapperWidth: number;
    highlightWidth: number;
    highlightBorderWidth: number;
    highlightColor: string;
    onMomentumScrollEnd: () => void;
    onScrollEndDrag: () => void;
    itemTextStyle: {
      fontSize: number;
      lineHeight: number;
      textAlign: string;
      color: string;
    };
    activeItemTextStyle: {
      fontSize: number;
      lineHeight: number;
      textAlign: string;
      color: string;
    };
    offset: number;
  };
  constructor(props) {
    super(props);
    this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    this.state = {
      selectedIndex: 0,
      dataSource: [],
      end: true,
    };
  }

  componentDidMount() {
    this.setState(prevState => ({
      dataSource: [...prevState.dataSource, ...this.props.dataSource],
    }));
    if (this.props.selectedIndex) {
      if (this.props.selectedData) {
        const indexToScrollOfSelectedDataInDataSource =
          this.props.dataSource.indexOf(this.props.selectedData);
        this.scrollToIndex(indexToScrollOfSelectedDataInDataSource);
      } else {
        this.scrollToIndex(this.props.selectedIndex);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedIndex !== prevProps.selectedIndex) {
      if (this.props.selectedData !== prevProps.selectedData) {
        const indexToScrollOfSelectedDataInDataSource =
          this.props.dataSource.indexOf(this.props.selectedData);
        this.scrollToIndex(indexToScrollOfSelectedDataInDataSource);
      } else {
        this.scrollToIndex(this.props.selectedIndex);
      }
    }

    if (prevProps.dataSource.length !== this.props.dataSource.length) {
      if (prevProps.dataSource.length !== this.props.dataSource.length) {
        this.setState(() => {
          return { dataSource: this.props.dataSource };
        });
        if (
          prevProps.dataSource.length <= this.props.dataSource.length &&
          prevProps.selectedData <= this.props.dataSource.length
        ) {
          const indexToScrollOfSelectedDataInDataSource =
            this.props.dataSource.indexOf(this.props.selectedData);
          if (
            this.props.dataSource.some(
              data => data === this.props.selectedData,
            ) &&
            prevProps.dataSource.length <= this.props.dataSource.length
          ) {
            this.props.onValueChange(
              this.props.selectedData,
              indexToScrollOfSelectedDataInDataSource,
            );
            return;
          } else {
            const selectedValue =
              this.props.dataSource[this.props.dataSource.length - 1] ||
              this.props.dataSource[0];
            this.props.onValueChange(
              selectedValue,
              this.props.dataSource.length - 1,
            );
            this.scrollToIndex(this.props.dataSource.length - 1);
            return;
          }
        } else {
          const indexToScrollOfSelectedDataInDataSource =
            this.props.dataSource.indexOf(this.props.selectedData);
          if (
            this.props.dataSource.some(data => data === this.props.selectedData)
          ) {
            this.props.onValueChange(
              this.props.selectedData,
              indexToScrollOfSelectedDataInDataSource,
            );
            return;
          }
        }
        this.props.onValueChange(this.props.dataSource[0], 0);
        this.scrollToIndex(0);
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { header, footer } = this.renderPlaceHolder();
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: this.props.wrapperHeight,
          flex: 1,
          overflow: 'hidden',
          alignSelf: 'center',
          width: this.props.wrapperWidth,
          backgroundColor: this.props.wrapperBackground,
        }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            top: (this.props.wrapperHeight - this.props.itemHeight) / 2,
            height: this.props.itemHeight,
            width: this.props.highlightWidth,
            borderTopColor: this.props.highlightColor,
            borderBottomColor: this.props.highlightColor,
            borderTopWidth: this.props.highlightBorderWidth,
            borderBottomWidth: this.props.highlightBorderWidth,
            backgroundColor: this.props.wrapperActiveBackground,
          }}
        />
        <ScrollView
          ref={sview => {
            this.sview = sview;
          }}
          showsVerticalScrollIndicator={false}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}>
          {header}
          {this.state.dataSource.map(this.renderItem.bind(this))}
          {footer}
        </ScrollView>
      </View>
    );
  }

  renderPlaceHolder = () => {
    const height = (this.props.wrapperHeight - this.props.itemHeight) / 2;
    const header = <View style={{ height, flex: 1 }} />;
    const footer = <View style={{ height, flex: 1 }} />;
    return { header, footer };
  };

  renderItem = (data, index) => {
    const isSelected = index === this.state.selectedIndex;
    const item = !isSelected ? (
      <Text style={styles.dateText}>{data}</Text>
    ) : (
      <Text style={styles.dateSelectedText}>{data}</Text>
    );
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: this.props.itemHeight,
        }}
        key={data + index}>
        {item}
      </View>
    );
  };

  scrollFix = e => {
    let verticalY = 0;
    const h = this.props.itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    let selectedIndex = Math.round(verticalY / h);
    if (this.state.dataSource?.length <= selectedIndex) {
      selectedIndex = this.state.dataSource?.length - 1;
    }
    if (selectedIndex < 0) {
      selectedIndex = 0;
    }
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      if (this.sview) {
        this.sview.scrollTo({ y: verticalElem });
      }
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    this.setState({
      selectedIndex,
    });
    // onValueChange
    if (this.props.onValueChange) {
      const selectedValue = this.state.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  };

  onScrollBeginDrag = () => {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  onScrollEndDrag = e => {
    this.props.onScrollEndDrag();
    this.dragStarted = false;
    // if not used, event will be garbaged
    const element = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this.scrollFix(element);
      }
    }, 10);
  };

  onMomentumScrollBegin = () => {
    this.momentumStarted = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  onMomentumScrollEnd = e => {
    this.props.onMomentumScrollEnd();
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  };

  scrollToIndex = ind => {
    this.setState({
      selectedIndex: ind,
    });
    const y = this.props.itemHeight * ind;
    setTimeout(() => {
      if (this.sview) {
        this.sview.scrollTo({ y });
      }
    }, 0);
  };
}
ScrollPicker.defaultProps = {
  dataSource: [1, 2, 3],
  itemHeight: 60,
  wrapperBackground: '#FFFFFF',
  wrapperHeight: 180,
  wrapperWidth: 150,
  highlightWidth: deviceWidth,
  highlightBorderWidth: 2,
  highlightColor: '#333',
  onMomentumScrollEnd: () => {},
  onScrollEndDrag: () => {},
  itemTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: '#B4B4B4',
  },
  activeItemTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: '#222121',
  },
  offset: 20,
};
const styles = StyleSheet.create({
  dateSelectedText: {
    fontSize: 16,
    fontWeight: FontWeight.bold,
    lineHeight: 18,
    letterSpacing: 0.2,
    zIndex: 1,
    color: Colors.black3A,
  },
  dateText: {
    color: Colors.greyEE,
    fontSize: 16,
    fontWeight: FontWeight.bold,
    lineHeight: 18,
    letterSpacing: 0.2,
    zIndex: 1,
  },
});
