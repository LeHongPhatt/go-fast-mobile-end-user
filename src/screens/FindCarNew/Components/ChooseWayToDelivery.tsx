import React, { useCallback } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { IconApp, ImageCus, TextCus, TouchCus, ViewCus } from 'components';
import { formatMoney } from 'utils';
import styles from './styles';
import { BaseStyle, Colors } from 'theme';
import { IconName, Images } from 'assets';
import { useOrders } from 'hooks';

interface Option {
  id: number;
  fast: boolean;
  price: number;
  time: number;
  distance: number;
}

interface IProps {
  initialValue?: Option;
  options: Option[];
  onCancel: () => void;
  onSubmit: (data: Option) => void;
  fromToData: any;
}

const ChooseWayToDelivery: React.FC<IProps> = props => {
  return (
    <ViewCus flex-1 flex-column flexGrow-1 style={[styles.w100]}>
      <BottomSheetScrollView>
        {props.options.map((val, index) => {
          return (
            <TouchCus
              key={index}
              flex-row
              mb-12
              px-16
              h-48
              items-center
              justify-space-between
              style={[
                styles.w100,
                val.id === props.initialValue?.id ? styles.selected : null,
              ]}
              onPress={() => {
                props.onSubmit(val);
              }}>
              <ViewCus flex-row items-center>
                <ViewCus mr-8>
                  {/* <Icon.MotoCylce fast={val.fast} /> */}
                  <ViewCus items-center>
                    <ViewCus
                      bg-pinkShadow45
                      br-40
                      h-30
                      w-30
                      style={[
                        {
                          position: 'absolute',
                        },
                      ]}></ViewCus>
                    {(val.type === 'CAR4SEATS' || val.type === 'CAR7SEATS') && (
                      <ImageCus
                        source={Images.car4Seat}
                        style={[
                          {
                            width: 32,
                            height: 32,
                          },
                        ]}
                        resizeMode="contain"
                      />
                    )}
                    {val.type === 'MOTORBIKE' && (
                      <ImageCus
                        source={Images.bike}
                        style={[
                          {
                            width: 32,
                            height: 32,
                          },
                        ]}
                        resizeMode="contain"
                      />
                    )}
                  </ViewCus>
                </ViewCus>
                <ViewCus>
                  <ViewCus flex-row items-center>
                    <TextCus color={Colors.black3A} mr-5>
                      {/* Giao {val.fast ? 'nhanh' : 'chậm'} {formatMoney(val.price)} */}
                      {val.title}
                    </TextCus>
                    <Icon.Info />
                  </ViewCus>
                  {val.subTitle && (
                    <ViewCus>
                      <TextCus color={'#838D8D'} caption>
                        {/* Giao {val.fast ? 'nhanh' : 'chậm'} {formatMoney(val.price)} */}
                        {val.subTitle}
                      </TextCus>
                    </ViewCus>
                  )}
                </ViewCus>
              </ViewCus>
              <TextCus color="#021616" mainSize bold>
                {formatMoney(val?.price)} - {val.distance}km
              </TextCus>
            </TouchCus>
          );
        })}
        <ViewCus px-16 style={[BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus color="#000000" heading5>
            Đi chung
          </TextCus>
          <Icon.Info width={20} height={20} />
        </ViewCus>

        <ViewCus px-16 mt-8 flex-row items-center>
          <ViewCus
            flex-row
            f-1
            style={{
              // borderRightWidth: 1,
              marginRight: 16,
              // paddingHorizontal: 12,
            }}>
            <Icon.CashOutLine />

            <TextCus color="#697575" subhead ml-5>
              Phương thức thanh toán
            </TextCus>
          </ViewCus>
          <ViewCus
            f-1
            style={{
              borderRightWidth: 1,
              borderLeftWidth: 1,
              marginRight: 16,
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <TextCus color="#697575" subhead>
              Ưu đãi
            </TextCus>
          </ViewCus>
          <ViewCus flex-row>
            <ViewCus
              mr-4
              style={{
                height: 4,
                width: 4,
                backgroundColor: '#EE0A0A',
                borderRadius: 8,
              }}
            />
            <ViewCus
              mr-4
              style={{
                height: 4,
                width: 4,
                backgroundColor: '#EE0A0A',
                borderRadius: 8,
              }}
            />
            <ViewCus
              mr-4
              style={{
                height: 4,
                width: 4,
                backgroundColor: '#EE0A0A',
                borderRadius: 8,
              }}
            />
          </ViewCus>
        </ViewCus>
      </BottomSheetScrollView>
    </ViewCus>
  );
};

export default ChooseWayToDelivery;
