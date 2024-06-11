import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type TOAST = 'success' | 'errors' | 'warning';
export interface ToastInfo {
  icon: any;
  color: string;
}
export interface IAlertProps {
  type: TOAST;
  title: string;
  subtitle?: string;
  onCancel?: () => void;
  onOk?: () => void;
  textCancel?: string;
  textOk?: string;
  styleCancel?: StyleProp<ViewStyle>;
  styleOk?: StyleProp<ViewStyle>;
  styleTextCancel?: StyleProp<TextStyle>;
  styleTextOk?: StyleProp<TextStyle>;
}
