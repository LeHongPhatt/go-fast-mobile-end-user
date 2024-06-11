import { API_HOST } from '@env';
import moment from 'moment';
import {
  Dimensions,
  Linking,
  PixelRatio,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native-image-crop-picker';
import { EActivityKey } from 'types';
export const momentConfig = {
  weekdays: 'Chủ nhật_Thứ hai_Thứ ba_Thứ tư_Thứ năm_Thứ sáu_Thứ bảy'.split('_'),
};
const scaleValue = PixelRatio.get() / 2;

const dimensions = Dimensions.get('window');

const isIos = Platform.OS === 'ios';

const formatMoney = (value: number) => {
  if (value) {
    return value.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
  }
  return 0 + 'đ';
};

export { dimensions, formatMoney, isIos };

export const addOrRemoveItemSelected = (array, item) => {
  const exists = array.includes(item);
  return exists ? array.filter(c => c !== item) : [item, ...array];
};

export const onlyUnique = (value, index, array) =>
  array.indexOf(value) === index;

export const openLink = (k: string, val: string) => {
  switch (k) {
    case 'email':
      return Linking.openURL(`mailto:${val}`);
    case 'telephone':
      return Linking.openURL(`${isIos ? 'telprompt:' : 'tel:'}${val}`);
    case 'url':
      return Linking.openURL(val);
  }
};

export const offsetKeyboard = Platform.select({
  ios: 0,
  android: 20,
});

//rotate90: { transform: `rotate(${}deg)`},
export const getTransformRotate = (deg: number) => ({
  transform: [{ rotate: `${deg}deg` }],
});

export const getWidth = (width: number) => ({
  width,
});

export const getHeight = (height: number) => ({
  height,
});

export const getPaddingHorizontal = (paddingHorizontal: number) => ({
  paddingHorizontal,
});

export const getPaddingVertical = (paddingVertical: number) => ({
  paddingVertical,
});

export const getWidthBySpace = (w: number) => ({
  width: width - w,
});

// export const sleep = (ms: number) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

export const trimStr = (str: string): string => {
  return str.toUpperCase().replace(/\s/g, '');
};

export const strExists = (str: string) => str.search(/Hidden/g) !== -1;

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const { width, height } = Dimensions.get('window');

export const scaleWithPixel = (size: number, limitScale = 1.2) => {
  /* setting default upto 20% when resolution device upto 20% with defalt iPhone 7 */
  const value = scaleValue > limitScale ? limitScale : scaleValue;
  return size * value;
};

export const heightHeader = () => {
  const landscape = width > height;

  if (Platform.OS === 'android') {
    return 45;
  }

  switch (height) {
    case 375:
    case 414:
    case 812:
    case 896:
    case 926:
    case 844:
    case 812:
    case 844:
      return landscape ? 45 : 88;
    default:
      return landscape ? 45 : 65;
  }
};

export const getFileExtension = (filename: string) => {
  const ext = /^.+\.([^.]+)$/.exec(filename);
  return !ext ? '' : ext[1];
};

export const getFileName = (path: string) => {
  try {
    const ext = path.split('/');
    return ext[ext.length - 1];
  } catch (error) {
    return '';
  }
};

export const getScreen = {
  TCK: 'SupportTicketDetail',
  EVE: 'EventDetail',
  NEW: 'NewsDetail',
  POM: 'PromotionDetail',
  ACT: 'Schedule',
  PCT: 'ContractList',
};

// export const genCodeByStr = (str: string) => {
//   const t = `${moment().format('YYYYMMDD-HHmmss')}${str}-`;
//   const rand = makeid(25 - t.length);
//   return `${t}${rand}`;
// };

export const formatDBYMDHMS = (str: string) =>
  moment(str).format('YYYY-MM-DD HH:mm:ss');

export const formatDBYMDHM = (str: string) =>
  moment(str).format('YYYY-MM-DD HH:mm');

export const formatDBYMD = (str: string) => moment(str).format('YYYY-MM-DD');

export const convertYMD = (str: string) => {
  const s = str.split('/');
  return `${s[2]}-${s[1]}-${s[0]}`;
};

export const formatDBHM = (str: string) => moment(str).format('HH:mm');
export const formatMinuteHours = (str: string) =>
  moment(str, 'HH').format('HH:mm');

export const formatDMY = (str: string) => moment(str).format('DD/MM/YYYY');
export const formatYMD = (str: string) => moment(str).format('YYYY-MM-DD');
export const formatYYYY = (str: string) => moment(str).format('YYYY');

export const formatDMYHM = (str: string) =>
  moment(str).format('DD/MM/YYYY HH:mm');

export const formatHMDMY = (str: string) =>
  moment(str).format('HH:mm DD/MM/YYYY');
export const formatTimeDMY = (str: string) =>
  moment(str).format('HH:mm - DD/MM/YYYY');
export const formatHTML = () => {
  return `
  <style>ul, ol{padding: 0, margin: 0}</style>
  `;
};

export const getCurrentTS = () => {
  return moment().unix();
};

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const isArray = (obj: any) => {
  return !!obj && obj.constructor === Array;
};

export const randomItem = (arr: any) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateSex = (value: any) => {
  switch (value) {
    case 'M': {
      return 'label.reference2_male';
    }
    case 'F': {
      return 'label.reference2_female';
    }
    default: {
      return 'label.reference2_other';
    }
  }
};

export const arrayChunk = (arr: any, n: number) => {
  if (arr?.length > 0 && arr?.length > n) {
    const array = arr?.slice();
    const chunks = [];
    while (array?.length) {
      chunks.push(array.splice(0, n));
    }
    return chunks;
  } else {
    return arr;
  }
};

export const divisibleNumber = (n: number, divider: number) =>
  n % divider === 0;
export const generateLocaleTime = (time: string) => {
  if (time) {
    let timeTmp = time.slice(0, 2);
    if (Number(timeTmp) < 12) {
      return 'AM';
    } else {
      return 'PM';
    }
  }
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function getExtension(filename: string) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}

export const isImage = (filename: string) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      //etc
      return true;
  }
  return false;
};

export const isVideo = (filename: string) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      // etc
      return true;
  }
  return false;
};

export const replaceHtml = (value: any) => {
  return value?.replace(/\\n/i, '');
};

export const generateTypeGroup = (fileName: string) => {
  if (fileName) {
    const lastIndex = fileName.lastIndexOf('.');
    return fileName.slice(0, lastIndex);
  }
};

export const sortByKey = (data: any[], key: string) => {
  try {
    return data.sort((a, b) => (a?.[key] < b?.[key] ? 1 : -1));
  } catch (error) {
    return data;
  }
};

export const formartDateAbc = (chooseDate: Date): string => {
  const chooseTime = moment(chooseDate); // replace with your desired date
  const currentTime = moment();
  if (chooseTime.isSame(currentTime, 'day')) {
    return moment(chooseDate).format('[Hôm nay], DD/MM/YYYY');
  }
  return moment(chooseDate).format('dddd, DD/MM/YYYY');
};
export const getComponent = disabled => {
  if (!disabled) {
    return View;
  }
  return TouchableOpacity;
};

const majorVersionIOS = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported =
  Platform.OS === 'ios' && majorVersionIOS >= 12;

export const codeToArray = (code?: string): string[] => code?.split('') ?? [];
export const getImage = ({ image, w = 255, h = 132 }: any) => {
  return `${API_HOST}images?path=${image}&width=${w}&height=${h}`;
};
export const uploadImage = ({ mime, filename, path }: Image) => {
  if (filename) {
    filename = `${new Date().getTime()}_${filename}`;
  }
  const file = {
    name: filename ?? mime,
    type: mime,
    uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
  };

  return file;
};
export const groupActivityData = data => {
  const result = data.reduce((prevItem, item) => {
    const { key, ...rest } = item;
    const existingGroup = prevItem.find(group => group.title === key);
    if (existingGroup) {
      existingGroup.data.push(rest);
    } else {
      prevItem.push({ title: key, data: [rest] });
    }
    return prevItem;
  }, []);
  // Find the index of the group with title "delivering"
  const deliveringIndex = result.findIndex(
    group => group.title === EActivityKey.DELIVERING,
  );
  // If the group exists, move it to the beginning of the array
  if (deliveringIndex > -1) {
    const deliveringGroup = result.splice(deliveringIndex, 1)[0];
    result.unshift(deliveringGroup);
  }
  return result;
};

// export const showModalAlert = (value: IAlertProps) => {
//   onShowModal(value);
// };
// export const hideModalAlert = () => {
//   onCloseModal();
// };
export const uploadFormData = params => {
  const formData = new FormData();
  for (const key in params) {
    if (
      params[key] === null ||
      params[key] === undefined ||
      params[key] === '' ||
      (typeof params[key] === 'object' && Object.keys(params[key]).length === 0)
    ) {
      continue;
    }
    formData.append(key, params[key]);
  }
  return formData;
};
export const getCurrentDate = () => {
  return moment().format('DD/MM/YYYY');
};
export const dataDefaults = [...Array(4).keys()];
export const formatDistanceKm = (distance: number) => {
  return (distance / 1000).toFixed(2);
};

export function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}
