import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { ImageCus, TextCus, TouchCus, ViewCus } from 'components';
import styles from './styles';
import { BaseStyle, Colors } from 'theme';
import { formatMoney, getImage, getWidthBySpace, openLink } from 'utils';
import { IDriver_OrderDetail, IOrderDetail } from 'types';
import React, { useEffect, useState } from 'react';
import { useOrders } from 'hooks';
import { Images } from 'assets';

interface IProps {
  orderDetailData?: IOrderDetail | null;
  onCancel: () => void;
}

const driverInfomation = (
  driverInfo: IDriver_OrderDetail | null | undefined,
) => {
  const callDriver = () => {
    if (driverInfo?.phone_number) {
      openLink('telephone', driverInfo.phone_number);
    }
  };
  return (
    <ViewCus>
      <ViewCus style={styles.w100} px-16>
        <ViewCus flex-row justify-space-between items-center>
          <ViewCus items-flex-start w-32 />
          <ViewCus items-center w-68 h-68>
            {driverInfo?.avatar && (
              <ImageCus
                source={{
                  uri: getImage({
                    image: driverInfo?.avatar,
                  }),
                }}
                style={BaseStyle.flexGrow1}
                resizeMode="stretch"
              />
            )}

            {!driverInfo?.avatar && (
              <ImageCus
                source={Images.driver}
                style={[
                  BaseStyle.flexGrow1,
                  BaseStyle['w100%'],
                  BaseStyle['h100%'],
                ]}
                resizeMode="stretch"
              />
            )}
          </ViewCus>
          <ViewCus items-flex-end w-32>
            <TouchCus onPress={callDriver}>
              <Icon.PhoneCircle width={32} height={32} />
            </TouchCus>
          </ViewCus>
        </ViewCus>
      </ViewCus>
      <ViewCus style={styles.w100} px-16>
        <ViewCus flex-column justify-center>
          <ViewCus mt-12>
            <TextCus textAlign="center" useI18n heading4>
              delivery.driverAreComing
            </TextCus>
          </ViewCus>
          {driverInfo?.full_name && (
            <ViewCus mt-12>
              <TextCus textAlign="center" heading2>
                {driverInfo?.full_name}
              </TextCus>
            </ViewCus>
          )}
        </ViewCus>
        <ViewCus mt-12>{Icon.Line(getWidthBySpace(32))}</ViewCus>
      </ViewCus>
    </ViewCus>
  );
};

const DriverAreComing: React.FC<IProps> = props => {
  //#region Static
  const { getFoodDetailByCode } = useOrders();
  //#endregion

  //#region ScreenState
  const [listItemDetail, setListItemDetail] = useState({});
  //#endregion
  //#region handle event
  const callCenter = () => {
    openLink('telephone', '19008079');
  };
  //#endregion

  useEffect(() => {
    if (
      props?.orderDetailData &&
      props?.orderDetailData?.order_items?.length > 0
    ) {
      const listFunc = props.orderDetailData.order_items.map(x => {
        return new Promise(res => {
          getFoodDetailByCode(x.item_id, res);
        });
      });
      if (listFunc.length > 0) {
        Promise.all(listFunc)
          .then((values: any[]) => {
            const listData: any = values.map(x => x?.data?.result?.[0]);
            const rs = {};
            listData?.forEach?.(x => {
              rs[`${x.id}`] = { ...x };
            });
            setListItemDetail(rs);
          })
          .catch((e: TypeError) => {
            console.log(
              '🚀 ~ file: DriverAreComing.tsx:63 ~ useEffect ~ e:',
              e,
            );
          });
      }
    }
  }, [props.orderDetailData]);

  if (!props.orderDetailData) {
    return <></>;
  }

  return (
    <>
      <BottomSheetView>
        {driverInfomation(props?.orderDetailData?.driver)}
      </BottomSheetView>
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <ViewCus>
          <ViewCus p-16>
            <ViewCus flex-row mt-12 justify-space-between items-center>
              <TextCus mainSize color={Colors.black3A}>
                Thời gian dự kiến:
              </TextCus>
              <ViewCus>
                <TextCus mainSize color={Colors.black3A}>
                  5 phút
                </TextCus>
              </ViewCus>
            </ViewCus>
            {/* <TextCus useI18n>delivery.informationLine</TextCus> */}
            <ViewCus py-16>
              {props.orderDetailData.order_items?.map((itemData, i) => {
                return (
                  <ViewCus key={i} mb-8>
                    <ViewCus flex-row items-flex-start>
                      <ViewCus mt-5 style={{ width: 52 }}>
                        {listItemDetail?.[itemData.item_id] &&
                          listItemDetail?.[itemData.item_id].image && (
                            <ImageCus
                              source={{
                                uri: getImage({
                                  image: listItemDetail[itemData.item_id].image,
                                }),
                              }}
                              style={BaseStyle.flexGrow1}
                              resizeMode="stretch"
                            />
                          )}
                      </ViewCus>
                      <ViewCus ml-8 justify-space-between>
                        <ViewCus flex-row items-center flexGrow-1>
                          <TextCus mainSize bold mr-2>
                            {itemData.quantity}x
                          </TextCus>
                          <TextCus mainSize>{itemData.item_name}</TextCus>
                        </ViewCus>
                        {/* <TextCus caption subHeadColor>
                      Chọn size: Size vừa
                    </TextCus> */}
                        {itemData.extra_options?.length > 0 && (
                          <TextCus caption subHeadColor>
                            Món thêm:{' '}
                            {itemData.extra_options
                              ?.map(x => x.extra_option_name)
                              .join(', ')}
                          </TextCus>
                        )}

                        {/* <TextCus caption color={Colors.black3A}>
                    Ghi chú: {itemData}
                  </TextCus> */}
                        <TextCus main bold>
                          {formatMoney(itemData.price)}
                        </TextCus>
                      </ViewCus>
                    </ViewCus>
                    <ViewCus
                      bbw-1
                      bbc-greyEE
                      style={getWidthBySpace(32)}
                      mt-8
                    />
                  </ViewCus>
                );
              })}
              <TextCus mainSize useI18n>
                category.payment
              </TextCus>
              <ViewCus>
                <ViewCus mt-8 flex-row justify-space-between>
                  <TextCus subhead subHeadColor useI18n>
                    category.estimate
                  </TextCus>
                  <TextCus mainSize>
                    {formatMoney(props.orderDetailData.order_price)}
                  </TextCus>
                </ViewCus>
                <ViewCus mt-8 flex-row justify-space-between>
                  <TextCus
                    subhead
                    subHeadColor
                    useI18n
                    paramI18n={{ number: 12 }}>
                    category.fee_delivery
                  </TextCus>
                  <TextCus mainSize>
                    {formatMoney(props.orderDetailData.shipping_fee)}
                  </TextCus>
                </ViewCus>
                <ViewCus mt-8 flex-row justify-space-between>
                  <TextCus subhead subHeadColor useI18n>
                    bottom.promotion
                  </TextCus>
                  <TextCus mainSize>
                    {formatMoney(props.orderDetailData.discount_order)}
                  </TextCus>
                </ViewCus>
                <ViewCus py-8 bbw-1 bbc-greyEE style={getWidthBySpace(32)} />
                <ViewCus mt-8 flex-row justify-space-between>
                  <TextCus heading5 useI18n>
                    delivery.cashPayment
                  </TextCus>
                  <TextCus heading5>
                    {formatMoney(props.orderDetailData.total_price)}
                  </TextCus>
                </ViewCus>
                <ViewCus my-18 items-center>
                  <TouchCus onPress={props.onCancel}>
                    <ViewCus
                      minh-48
                      br-8
                      bg-greyAD
                      style={getWidthBySpace(32)}
                      justify-center
                      items-center>
                      <TextCus semiBold mainSize color={Colors.greyF8} useI18n>
                        delivery.cancelOrder
                      </TextCus>
                    </ViewCus>
                  </TouchCus>
                  <TouchCus onPress={callCenter}>
                    <TextCus mainSize color-blue4D mt-12 useI18n>
                      delivery.contactToCenterToCancelOrder
                    </TextCus>
                  </TouchCus>
                </ViewCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </BottomSheetScrollView>
    </>
  );
};

export default DriverAreComing;
