import { ReactNode } from 'react';
import { ManagerOptions, SocketOptions } from 'socket.io-client';

export interface IItemFormCreateTicket {
  groupDetailId?: string; // 'bf791584-7201-40db-8f8b-1cc1b808fc25';
  name: string; //  'Test canceled';
  paymentType: 'coin_transfer' | 'cash'; // 'coin_transfer';
  amount: string; //50000;
  commission: string; //10;
}

export interface ITimer {
  timer: number;
  startTimer: (time: number) => void;
  stopTimer: () => void;
}

export interface ICountDownProps {
  start?: number;
  fps?: number;
}

export type TmodeContent = 'light-content' | 'dark-content' | 'default';

export interface ITimeLineProps {
  data?: [];
}

export interface IItemVote {
  name: string;
  qty: number;
}

export interface IItemTicket {
  id?: string;
  owner_id?: string;
  name?: string;
  status: string;
  route?: string;
  payment_type?: string;
  commission?: string;
  amount?: number;
  time?: string;
  emotion?: any[];
  reactions?: any[];
  owner: {
    user_name: string;
    full_name: string;
    email: string;
    avatar: string;
    account_bank: string;
    birthday: string;
    address: string;
    balance: number;
    balance_available: number;
    id: string; // '23aae872-2142-4b69-a88c-ac59fa34eceb';
    phone_number: string; // '0906880119';
    createdAt: string;
    updatedAt: string; // '2023-04-22T15:42:42.060Z';
  };
}

export interface IItemTicketOne {
  id?: string;
  name?: string;
  route?: string;
  pay_method?: string;
  amount?: number;
  referral_fee?: string;
}

export interface IItemBookingInfo {
  id?: string;
  name?: string;
  status: string;
  pay_method?: string;
  amount?: number;
  commission: string;
  owner: {
    account_bank?: string;
    address?: string;
    avatar?: string;
    balance: number;
    balance_available: number;
    birthday?: string;
    createdAt: string;
    email: null;
    full_name: null;
    id: string;
    identification: {
      back_image: null;
      front_image: null;
    };
    license: {
      back_image: null;
      front_image: null;
    };
    phone_number: string;
    updatedAt: string;
    user_name: string;
  };
}

export interface IItemImage {
  id?: string;
  images?: [];
  comment?: string;
  time?: string;
  emotion?: any[];
}

export interface IBannerADV {
  data?: IBannerADVItem[];
  children?: ReactNode;
}

export interface IBannerADVItem {
  title?: string;
  content?: string;
  detail?: string;
}

export interface IImageViewerProps {
  children?: ReactNode;
  style?: any;
  visible?: boolean;
  data?: any;
  isDocumentCode?: boolean;
  isCustom?: boolean;
  seletedItem?: any;
  projectname?: string;
}

export interface ISwiperProps {
  images?: [];
  visible: boolean;
  toggleModal?: () => void;
}

export interface IListItemProps {
  screenType?: string;
  item?: any;
  pinType?: string;
}

export interface INotiComponent {
  list?: [];
  isAll: boolean;
}

export interface IDropdownOption {
  id?: number | string;
  title?: string;
  data?: any;
}

export interface ICardProfile {
  data?: IDataCard[];
  title?: string;
  isRequire?: boolean;
}

export interface IDataCard {
  title?: string;
  icon?: any;
  onPress?: () => void;
}

export interface IUseSocket {
  uri: string;
  opts?: Partial<ManagerOptions & SocketOptions>;
}

declare module '@env';
