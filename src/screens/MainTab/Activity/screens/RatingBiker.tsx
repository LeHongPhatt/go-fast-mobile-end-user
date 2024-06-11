import {
  HomeLayout,
  StarsRating,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
} from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
type TFormRating = {
  description: string;
};
const RatingBiker: React.FC = () => {
  const { control, handleSubmit } = useForm<TFormRating>({
    defaultValues: {
      description: '',
    },
  });
  const onRating = useCallback((value: TFormRating) => {
    console.log('value', value);
    NavigationService.navigate(Routes.HomeTabs, {
      screen: Routes.Activity,
    });
  }, []);
  const onChooseItem = useCallback(item => {
    console.log(item);
  }, []);
  const renderSuggestItem = useCallback(
    (item, index) => {
      return (
        <TouchCus
          style={styles.circle}
          key={index}
          onPress={() => onChooseItem(item)}>
          <TextCus>Ngon xỉu</TextCus>
        </TouchCus>
      );
    },
    [onChooseItem],
  );
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'activity.rating_biker',
        iconColor: Colors.white,
      }}
      isForForm
      textBtn="action.send_rating"
      onPress={handleSubmit(onRating)}
      styleContent={styles.p16}>
      <ViewCus>
        <ViewCus items-center>
          <StarsRating point={5} size={40} style={styles.mr16} />
        </ViewCus>
        <ViewCus my-16 style={styles.contentSuggest}>
          {[...Array(5).keys()].map(renderSuggestItem)}
        </ViewCus>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputs
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Nhập cảm nhận của bạn"
              style={styles.input}
              multiline={true}
            />
          )}
        />
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  p16: {
    padding: 16,
  },
  mr16: {
    marginRight: 16,
  },
  input: {
    height: 125,
    paddingVertical: 12,
  },
  circle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.greyAD,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 10,
    marginRight: 10,
  },
  contentSuggest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RatingBiker;
