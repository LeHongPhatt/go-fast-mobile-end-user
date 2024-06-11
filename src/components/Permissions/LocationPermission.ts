import Geolocation from '@react-native-community/geolocation';
import { requestMultiple } from 'react-native-permissions';
import { isIos, ANDROID_PERMISSIONS_LOCATION } from 'utils';

export async function LocationPermission() {
  try {
    const grantedAndroid = await requestMultiple(ANDROID_PERMISSIONS_LOCATION);
    const grantedIOS = Geolocation.requestAuthorization();
    return isIos ? grantedIOS : grantedAndroid;
  } catch (error) {
    return false;
  }
}
