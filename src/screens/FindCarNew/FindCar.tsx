import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import { Buttons, IconCus, TextCus, TouchCus, ViewCus } from 'components';
import { BottomSheetModalContainer } from 'components/BottomSheetModals';
import { useAuth, useCustomerSocket, useLocation, useOrders } from 'hooks';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BackHandler } from 'react-native';
import { Colors } from 'theme';
import { FindCarType, IRefBottom } from 'types';
import {
  ChooseFromTo,
  ChooseWayToDelivery,
  DriverAreComing,
  FindDriver,
} from './Components';
import CannotFoundDriver from './Components/CannotFoundDriver';
import { FakeMapFind } from './Components/FakeMapFind';
import OrderIsCancel from './Components/OrderIsCancel';
import OrderIsSuccess from './Components/OrderIsSuccess';
import QuestionFromTo from './Components/QuestionFromTo';
import styles from './styles';

export enum FindCarScreenStepView {
  QUESTION_CHOOSE_FROM_TO,
  CHOOSE_FROM_TO,
  COMFIRM_FROM_TO,
  CHOOSE_DELIVERY_OPTION,
  FIND_DRIVER,
  ON_PROCESS,
  DRIVER_ARE_COMING,
  CANNOT_FOUND_DRIVER,
  ORDER_IS_CANCEL,
  ORDER_IS_SUCCESS,
}

const FindCar = () => {
  //#region Static
  const route = useRoute<RouteProp<RootStackParamList, 'FindCar'>>();
  const { locationUser } = useLocation();
  const { user } = useAuth();
  const {
    onConnect,
    connect,
    onConnectError,
    socket: customerSocket,
    isConnected,
    onNotFoundMotoDriver,
    onFoundMotobikeDriver,
  } = useCustomerSocket();

  const [fromToData, setFromToData] = useState({
    from: {
      address: '',
      lat: locationUser.lat,
      long: locationUser.long,
    },
    to: {
      address: '',
      lat: locationUser.lat,
      long: locationUser.long,
    },
  });
  const [tripInfo, setTripInfo] = useState({});
  const currentOrderCodeRef = useRef<string | null>(null);
  const { getInfoTaxiService, findCarAction, loading, cancleFindDriver } =
    useOrders();
  const deliveryDriverOptions = useMemo(() => {
    const { from, to } = fromToData;
    const rs = [
      {
        id: 1,
        title: 'Xe máy',
        subTitle: '',
        type: 'MOTORBIKE',
      },
      {
        id: 2,
        title: 'Ô tô 4 chỗ',
        subTitle: 'Thoải mái với 4 chỗ ngồi',
        type: 'CAR4SEATS',
      },
      {
        id: 3,
        title: 'Ô tô 7 chỗ',
        subTitle: 'Thoải mái với 7 chỗ ngồi',
        type: 'CAR7SEATS',
      },
    ];
    if (
      from.address &&
      to.address &&
      from.long &&
      from.lat &&
      to.long &&
      to.lat
    ) {
      for (let i = 0; i < rs.length; i++) {
        getInfoTaxiService(
          {
            pickupLocation: {
              address: from.address,
              long: from.long?.toString(),
              lat: from.lat?.toString(),
            },
            dropoffLocation: {
              address: to.address,
              long: to.long?.toString(),
              lat: to.lat?.toString(),
            },
            vehicle: rs[i]?.type?.toString(),
          },
          res => {
            console.log('======res=====', JSON.stringify(res));
            if (res.data.result?.length > 0) {
              rs[i].price = res.data.result[0].price;
              rs[i].distance = res.data.result[0].distanceKm;
              rs[i].distanceText = res.data.result[0].distanceText;
            }
          },
        );
      }
      console.log('======rs=====', JSON.stringify(rs));
    }
    return rs;
  }, [route?.params?.type, fromToData]);

  //#endregion

  //#region Ref control
  const refContentBottom = useRef<IRefBottom>(null);
  //#endregion

  //#region State screen
  const [stepView, setStepView] = useState(
    FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO,
  );
  const [deliveryDriverSelected, setDeliveryDriverSelected] = useState(
    deliveryDriverOptions[0],
  );

  const snapPointModal = useMemo(() => {
    let rs: [any, any] | any[] = ['25%', '25%'];
    switch (stepView) {
      case FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO:
        rs = [142, '100%'];
        break;
      case FindCarScreenStepView.CHOOSE_FROM_TO:
        rs = ['100%', '100%'];
        break;
      case FindCarScreenStepView.CHOOSE_DELIVERY_OPTION:
        rs = [296, '50%'];
        break;

      case FindCarScreenStepView.FIND_DRIVER:
        rs = ['32%', '32%'];
        break;

      case FindCarScreenStepView.ON_PROCESS:
        rs = ['100%'];
        break;

      case FindCarScreenStepView.DRIVER_ARE_COMING:
        rs = ['32%', '32%'];
        break;
      case FindCarScreenStepView.CANNOT_FOUND_DRIVER:
        rs = [310, '40%'];
        break;
      case FindCarScreenStepView.ORDER_IS_CANCEL:
        rs = [310, '40%'];
        break;

      case FindCarScreenStepView.ORDER_IS_SUCCESS:
        rs = [334, '35%'];
        break;

      default:
        break;
    }
    return rs;
  }, [stepView]);

  //#endregion

  //#region Ref value
  const refTimeOutCacheRunningFunction = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  //#endregion

  //#region Screen function
  const onChooseFromToChange = useCallback((fromData, toData) => {
    setFromToData({
      from: fromData,
      to: toData,
    });
  }, []);
  const getTypeFindDirection = useCallback((type: FindCarType) => {
    let rs = 'bike';
    if (route?.params?.type) {
      switch (type) {
        case FindCarType.MOTORBIKE:
          break;

        default:
          rs = 'car';
          break;
      }
    }
    return rs;
  }, []);
  //#endregion

  //#region Render function
  const renderFooterModal = useCallback(() => {
    switch (stepView) {
      case FindCarScreenStepView.CHOOSE_FROM_TO:
        return <></>;
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  const isValidFrom =
                    fromToData.from?.address &&
                    fromToData.from?.lat &&
                    fromToData.from?.long;
                  const isValidTo =
                    fromToData.to?.address &&
                    fromToData.to?.lat &&
                    fromToData.to?.long;
                  if (isValidFrom && isValidTo) {
                    setStepView(FindCarScreenStepView.CHOOSE_DELIVERY_OPTION);
                  }
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  Xác nhận
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );
      case FindCarScreenStepView.CHOOSE_DELIVERY_OPTION:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  onFindDriverClick();
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  Đặt TasCaree
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      case FindCarScreenStepView.CANNOT_FOUND_DRIVER:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                // onPress={() => {
                //   refContentBottom.current?.close();
                //   NavigationService.goBack();
                //   //huỷ
                // }}
                onPress={onCancelFindDriver}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.cancelFind
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  setStepView(FindCarScreenStepView.FIND_DRIVER);
                  setTimeout(() => {
                    setStepView(FindCarScreenStepView.CANNOT_FOUND_DRIVER);
                  }, 60000);
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.continueFind
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      case FindCarScreenStepView.ORDER_IS_CANCEL:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.replace(Routes.Categories);
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  cancel
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[styles.bo8]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.resetTo(
                    [
                      {
                        name: Routes.HomeTabs,
                      },
                      {
                        name: Routes.Categories,
                      },
                    ],
                    1,
                  );
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  delivery.createNewOrder
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      case FindCarScreenStepView.ORDER_IS_SUCCESS:
        return (
          <ViewCus flex-row p-16>
            <ViewCus f-1>
              <Buttons
                h-48
                mr-12
                round={false}
                style={[
                  {
                    backgroundColor: Colors.greyAD,
                  },
                  styles.bo8,
                ]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.reset(Routes.Home);
                  NavigationService.navigate(Routes.Home);
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  exit
                </TextCus>
              </Buttons>
            </ViewCus>
            <ViewCus f-1>
              <Buttons
                h-48
                round={false}
                style={[
                  styles.bo8,
                  {
                    backgroundColor: Colors.success,
                  },
                ]}
                onPress={() => {
                  refContentBottom.current?.close();
                  NavigationService.resetTo(
                    [
                      {
                        name: Routes.HomeTabs,
                      },
                      {
                        name: Routes.Rating,
                        params: {
                          type: 'car',
                        },
                      },
                    ],
                    1,
                  );
                }}>
                <TextCus useI18n bold semiBold color={Colors.white}>
                  activity.rating
                </TextCus>
              </Buttons>
            </ViewCus>
          </ViewCus>
        );

      default:
        return <></>;
    }
  }, [stepView, deliveryDriverSelected, fromToData]);

  const renderContentModal = (step: FindCarScreenStepView) => {
    switch (step) {
      case FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO:
        return <QuestionFromTo setStepView={setStepView} />;
      case FindCarScreenStepView.CHOOSE_FROM_TO:
        return (
          <>
            <ChooseFromTo
              fromToData={fromToData}
              onChooseFromToChange={onChooseFromToChange}
              setStepView={setStepView}
            />
          </>
        );
      case FindCarScreenStepView.CHOOSE_DELIVERY_OPTION:
        return (
          <ChooseWayToDelivery
            initialValue={deliveryDriverSelected}
            options={deliveryDriverOptions}
            onCancel={() => {
              refContentBottom.current?.close();
              handleBackOrCancel();
            }}
            fromToData={fromToData}
            onSubmit={data => {
              setDeliveryDriverSelected(data);
            }}
          />
        );

      case FindCarScreenStepView.FIND_DRIVER:
        return (
          <FindDriver
            onCancel={onCancelFindDriver}
            onSubmit={() => {
              setStepView(FindCarScreenStepView.DRIVER_ARE_COMING);
            }}
            type={deliveryDriverSelected.type}
            fromToData={fromToData}
          />
        );
      case FindCarScreenStepView.DRIVER_ARE_COMING:
        return (
          <DriverAreComing
            onCancel={() => {
              setStepView(FindCarScreenStepView.CHOOSE_DELIVERY_OPTION);
            }}
            fromToData={fromToData}
            type={deliveryDriverSelected.type}
          />
        );

      case FindCarScreenStepView.ORDER_IS_CANCEL:
        return <OrderIsCancel />;

      case FindCarScreenStepView.CANNOT_FOUND_DRIVER:
        return <CannotFoundDriver />;

      case FindCarScreenStepView.ORDER_IS_SUCCESS:
        return <OrderIsSuccess />;

      default:
        return <></>;
    }
  };

  //#endregion

  //#region Watch change
  useEffect(() => {
    refContentBottom.current?.show();
  }, [refContentBottom.current]);

  useEffect(() => {
    // let funcRun: (() => void) | null = null;
    // let timeOut = 5000;
    // if (stepView === 0) {
    //   timeOut = 1000;
    //   funcRun = () => refContentBottom.current?.show();
    // }
    // if (stepView === FindCarScreenStepView.FIND_DRIVER) {
    //   funcRun = () => {
    //     setStepView(FindCarScreenStepView.DRIVER_ARE_COMING);
    //   };
    // }
    // if (stepView === FindCarScreenStepView.DRIVER_ARE_COMING) {
    //   funcRun = () => {
    //     setStepView(FindCarScreenStepView.ORDER_IS_SUCCESS);
    //   };
    // }
    // refTimeOutCacheRunningFunction.current = setTimeout(() => {
    //   funcRun?.();
    // }, timeOut);
    // return () => {
    //   if (refTimeOutCacheRunningFunction.current !== null) {
    //     clearTimeout(refTimeOutCacheRunningFunction.current);
    //   }
    // };
  }, [stepView]);

  useEffect(() => {
    const handle = BackHandler.addEventListener('hardwareBackPress', () => {
      handleBackOrCancel();
      return true;
    });
    return () => {
      handle.remove();
    };
  }, [stepView]);

  useEffect(() => {
    return () => {
      if (refTimeOutCacheRunningFunction.current !== null) {
        clearTimeout(refTimeOutCacheRunningFunction.current);
      }
    };
  }, []);

  useEffect(() => {
    onFoundMotobikeDriver(handleCustomerSocketFoundDriver);
  }, []);

  useEffect(() => {
    onNotFoundMotoDriver(handleCustomerSocketNotFoundDriver);
  }, []);

  const handleCustomerSocketNotFoundDriver = data => {
    console.log('====handleCustomerSocketNotFoundDriver', JSON.stringify(data));
  };
  //#endregion

  // const onSocketCustomerConnected = useCallback(() => {
  //   console.log('onSocketCustomerConnected');
  //   setStepView(ScreenStepView.CHOOSE_DELIVERY_OPTION);
  //   customerSocket.removeAllListeners();
  //   customerSocket.on('customer:found-driver', handleCustomerSocketFoundDriver);
  //   customerSocket.on(
  //     'customer:order-delivered',
  //     handleCustomerSocketOrderDelivered,
  //   );
  //   customerSocket.on(
  //     'customer:order-delivering',
  //     handleCustomerSocketOrderDelivering,
  //   );
  // }, [customerSocket]);

  // const onSocketCustomerConnectionError = useCallback(
  //   err => {
  //     console.log('onSocketCustomerConnectionError', err);
  //   },
  //   [customerSocket],
  // );
  // useEffect(() => {
  //   onConnect(onSocketCustomerConnected);
  //   onConnectError(onSocketCustomerConnectionError);
  // }, []);
  const onCancelFindDriver = () => {
    cancleFindDriver({ id: tripInfo.id }, res => {
      if (res.status === 200) {
        setStepView(FindCarScreenStepView.CHOOSE_DELIVERY_OPTION);
      }
    });
  };

  const onListenSocket = () => {
    connect();
    onConnectError(onSocketCustomerConnectionError);
  };

  const onSocketCustomerConnectionError = useCallback(
    err => {
      console.log('onSocketCustomerConnectionError', err);
    },
    [customerSocket],
  );

  const handleCustomerSocketFoundDriver = args => {
    console.log('====args====', JSON.stringify(args));
    setStepView(FindCarScreenStepView.DRIVER_ARE_COMING);
  };
  // const handleCustomerSocketOrderDelivered = useCallback(
  //   args => {
  //     console.log('customer:order-delivered:', args);
  //     Alert.alert('tài xế đã đến');
  //   },
  //   [customerSocket],
  // );

  // const handleCustomerSocketOrderDelivering = useCallback(
  //   args => {
  //     console.log('customer:order-delivering:', args);
  //     Alert.alert('tài xế đang đến');
  //   },
  //   [customerSocket],
  // );
  //#region Handle event
  const onFindDriverClick = () => {
    const { from, to } = fromToData;
    findCarAction(
      {
        pickupLocation: {
          address: from.address,
          long: from.long?.toString(),
          lat: from.lat?.toString(),
        },
        dropoffLocation: {
          address: to.address,
          long: to.long?.toString(),
          lat: to.lat?.toString(),
        },
        vehicle: deliveryDriverSelected?.type,
      },
      response => {
        if (response.status === 200) {
          console.log('======successresponse=======', response);

          onListenSocket();
          setTripInfo(response.data?.result[0]);
          setStepView(FindCarScreenStepView.FIND_DRIVER);
          setTimeout(() => {
            setStepView(FindCarScreenStepView.CANNOT_FOUND_DRIVER);
          }, 60000);
        }
      },
    );
  };

  const handleBackOrCancel = useCallback(() => {
    // refContentBottom.current?.close();
    // NavigationService.replace(Routes.HomeTabs);
    switch (stepView) {
      case FindCarScreenStepView.CHOOSE_FROM_TO:
        setStepView(FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO);
        break;

      case FindCarScreenStepView.CHOOSE_DELIVERY_OPTION:
        setStepView(FindCarScreenStepView.CHOOSE_FROM_TO);
        break;

      default:
        refContentBottom.current?.close();
        NavigationService.replace(Routes.HomeTabs);
        break;
    }
  }, [stepView]);
  //#endregion

  return (
    <>
      <ViewCus l-16 t-90 style={styles.posAbsolute}>
        <TouchCus
          onPress={() => {
            handleBackOrCancel();
          }}>
          <ViewCus bg-white br-12 w-32 h-32 items-center justify-center>
            <IconCus name={IconName.ChevronLeft} color={Colors.main} />
          </ViewCus>
        </TouchCus>
      </ViewCus>
      <ViewCus f-1>
        <FakeMapFind
          type={getTypeFindDirection(deliveryDriverSelected.type)}
          // type={'car'}
          startFind={
            ![
              FindCarScreenStepView.CHOOSE_DELIVERY_OPTION,
              FindCarScreenStepView.QUESTION_CHOOSE_FROM_TO,
              FindCarScreenStepView.CHOOSE_FROM_TO,
              FindCarScreenStepView.DRIVER_ARE_COMING,
              FindCarScreenStepView.ORDER_IS_SUCCESS,
            ].includes(stepView)
          }
          fromToData={fromToData}
          stepView={stepView}
        />
        <BottomSheetModalContainer
          footerComponent={renderFooterModal}
          hideBackdrop={true}
          ref={refContentBottom}
          index={1}
          keyboardBehavior="fullScreen"
          android_keyboardInputMode="adjustResize"
          showIndicator={true}
          snapPoints={snapPointModal}>
          {renderContentModal(stepView)}
        </BottomSheetModalContainer>

        {/* <BottomSheet
          index={1}
          android_keyboardInputMode="adjustResize"
          snapPoints={snapPointModal}>
          {renderContentModal(stepView)}
        </BottomSheet> */}
      </ViewCus>
    </>
  );
};

export default FindCar;
