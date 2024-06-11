/**
 * @description the hook to show notification by toast message
 */
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

export const useNotify = () => {
  /**
   * @description define toast message with default type
   * @param {string} title - title message
   * @param {string}  message - body message
   * @param {any = {}}  options - optional params
   * @returns {any}
   */
  const show = useCallback(
    (title: string, message: string, options: any = {}) =>
      Toast.show({
        text1: title,
        text2: message,
        ...options,
      }),
    [],
  );

  /**
   * @description define toast message with type is success
   * @param {string} title - title message
   * @param {string}  message - body message
   * @param {any = {}}  options - optional params
   * @returns {any}
   */
  const success = useCallback(
    (title: string, message: string, options: any = {}) =>
      show(title, message, {
        ...options,
        type: 'success',
      }),
    [show],
  );

  /**
   * @description define toast message with type is info
   * @param {string} title - title message
   * @param {string}  message - body message
   * @param {any = {}}  options - optional params
   * @returns {any}
   */
  const info = useCallback(
    (title: string, message: string, options: any = {}) =>
      show(title, message, {
        ...options,
        type: 'info',
      }),
    [show],
  );

  /**
   * @description define toast message with type is error
   * @param {string} title - title message
   * @param {string}  message - body message
   * @param {any = {}}  options - optional params
   * @returns {any}
   */
  const danger = useCallback(
    (title: string, message: string, options: any = {}) =>
      show(title, message, {
        ...options,
        type: 'error',
      }),
    [show],
  );

  return {
    show,
    info,
    danger,
    success,
  };
};
