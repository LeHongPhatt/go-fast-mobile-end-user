import { Images } from 'assets';
import { Colors } from 'theme';
import { IIntroSilde } from 'types';
import { EnumStatusRestaurant } from 'utils/enum';

export const CONTRACT_INFORMATION = [
  {
    id: 1,
    title: 'product.payment_information',
  },
  {
    id: 2,
    title: 'product.general_information',
  },
  {
    id: 3,
    title: 'product.customer_information',
  },
];

export const STATUS_LIST = [
  {
    id: 1,
    title: 'text.opening',
    color: Colors.success,
    status: EnumStatusRestaurant.OPENNING,
  },
  {
    id: 2,
    title: 'text.closed',
    color: Colors.disable,
    status: EnumStatusRestaurant.CLOSED,
  },
  {
    id: 3,
    title: 'text.closed_until',
    color: Colors.redEB,
    status: EnumStatusRestaurant.CLOSED_UNTILL,
  },
];

export const NOTI_LIST = [
  {
    content:
      'Cập nhật tính năng mới của Go Fast để quản lý nhà hàng dễ dàng hơn',
    image: Images.Notification,
  },
  {
    content: 'Tính năng mới của Go Fast để quản lý nhà hàng dễ dàng hơn',
    image: Images.Notification,
  },
  {
    content:
      'Cập nhật tính năng mới của Go Fast để quản lý nhà hàng dễ dàng hơn',
    image: Images.Notification,
  },
];

export const slidesIntro: IIntroSilde[] = [
  {
    index: 1,
    image: Images.firstIntro,
    title: 'intro.title_1',
    subtitle: 'intro.subtitle_1',
  },
  {
    index: 2,
    image: Images.secondIntro,
    title: 'intro.title_2',
    subtitle: 'intro.subtitle_2',
  },
  {
    index: 3,
    image: Images.thirdIntro,
    title: 'intro.title_3',
    subtitle: 'intro.subtitle_3',
  },
];
