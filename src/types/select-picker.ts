export enum SELECT_OPTION {
  DATE_PICKER = 'date',
  TIME_PICKER = 'time',

  OPTION_PICKER = 'option',
}
export interface ISelectTime {
  hour: string | number;
  minute: string | number;
}
interface ISectionTitle {
  sectionTitle: string;
}
export const dataDates: ISectionTitle[] = [
  {
    sectionTitle: 'Ngày',
  },
  {
    sectionTitle: 'Tháng',
  },
  {
    sectionTitle: 'Năm',
  },
];
export const dataTimes: ISectionTitle[] = [
  {
    sectionTitle: 'Giờ',
  },
  {
    sectionTitle: 'Phút',
  },
];
export const dataGender = ['Nam', 'Nữ', 'Khác'];
export const formatGender = {
  Nam: 'MALE',
  Nữ: 'FEMALE',
  Khác: 'UNKNOWN',
};
export const formatNameGender = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  UNKNOWN: 'Khác',
};
