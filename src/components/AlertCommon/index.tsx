import { Alert, AlertButton, AlertOptions } from 'react-native';

export default function Index(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
) {
  return Alert.alert(title, message, buttons, options);
}
