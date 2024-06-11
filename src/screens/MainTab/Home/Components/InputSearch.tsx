import { IconName } from 'assets';
import { TextInputs, ViewCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React from 'react';
import { Colors } from 'theme';
import { styleSpacing } from 'utils';

interface IProps {}

const InputSearch: React.FC<IProps> = () => {
  return (
    <ViewCus px-16>
      <TextInputs
        leftIcon={IconName.Search}
        styleInput={[styleSpacing('px-8')]}
        style={[{ backgroundColor: Colors.greyF5 }]}
        placeholder="search"
        onSubmitEditing={({ nativeEvent: { text } }) =>
          NavigationService.navigate(Routes.Categories, {
            searchText: text,
          })
        }
      />
    </ViewCus>
  );
};

export default InputSearch;
