import moment from 'moment';
import * as Yup from 'yup';
const validatePhone = 'Số điện thoại không đúng định dạng';
const requirePhone = 'Yêu cầu nhập số điện thoại';
const passwordMinSix = 'Mật khẩu tối thiểu 6 ký tự';
const passwordMaxTwenty = 'Mật khẩu tối đa 20 ký tự';
const requiredPasswordMessage = 'Vui lòng nhập mật khẩu';
const confirmPasswordMessage = 'Mật khẩu không trùng khớp';
const requiredErrorMessage = 'Trường này là bắt buộc';
const validateOtp = 'Vui lòng nhập đủ số xác thực';
const requireOtp = 'Vui lòng nhập mã xác thực';
const regexPassword = /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/;
const validPasswordMessage =
  'Tối thiểu 6 ký tự.\n Ít nhất 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt';
const newPasswordMessage = 'Mật khẩu mới không được trùng mật khẩu cũ';
const validationUsername = 'Vui lòng nhập họ và tên';
const validationAddress = 'Vui lòng nhập địa chỉ';
const emailMessage = 'Email không đúng định dạng';
const fromErrorMessage = 'Vui lòng nhập điểm đến';
const toErrorMessage = 'Vui lòng nhập điểm tới';
const birthDayErrorMessage = 'Bạn phải đủ 16 tuổi';
const validationBirthDay = 'Vui lòng chọn ngày sinh';
const regexMail =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password = Yup.string()
  .min(6, passwordMinSix)
  .max(20, passwordMaxTwenty)
  .required(requiredPasswordMessage);
const phoneNumber = Yup.string()
  .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, validatePhone)
  .required(requirePhone);
export const yupSchemaInputPhone = Yup.object({
  phoneNumber,
});
export const yupSchemaInputPassword = Yup.object({
  password,
});
export const yupSchemaRegisterPassword = Yup.object({
  password,
  confirmPassword: Yup.string()
    .required(requiredErrorMessage)
    .oneOf([Yup.ref('password')], confirmPasswordMessage),
});
export const yupSchemaOtp = Yup.object({
  otp: Yup.string().min(6, validateOtp).required(requireOtp),
});
export const yupChangePasswordSchema = Yup.object().shape({
  old_password:
    // Yup.string()
    //   .min(6, passwordMinSix)
    //   .max(20, passwordMaxTwenty)
    //   .matches(regexPassword, validPasswordMessage)
    password.required(requiredErrorMessage),
  new_password:
    // Yup.string()
    //   .min(6, passwordMinSix)
    //   .max(20, passwordMaxTwenty)
    //   .matches(regexPassword, validPasswordMessage)
    //   .required(requiredErrorMessage)
    password.notOneOf([Yup.ref('old_password'), null], newPasswordMessage),
  re_new_password: Yup.string()
    .required(requiredErrorMessage)
    .oneOf([Yup.ref('new_password'), null], confirmPasswordMessage),
});

export const yupSchemaKYC = Yup.object().shape({
  fullName: Yup.string().required(validationUsername),
  address: Yup.string().required(validationAddress),
  email: Yup.string().matches(regexMail, emailMessage),
  birthday: Yup.string()
    .required(validationBirthDay)
    .test('birthday', birthDayErrorMessage, value => {
      return (
        moment().diff(
          moment(value, 'DD-MM-YYYY HH:mm').toISOString(),
          'years',
        ) >= 16
      );
    }),
});

export const yupSchemaBiker = Yup.object().shape({
  from: Yup.string().required(fromErrorMessage),
  to: Yup.string().required(toErrorMessage),
});
