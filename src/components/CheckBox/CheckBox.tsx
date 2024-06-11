import * as React from 'react';
import { IconName } from 'assets';
import { IconApp, TextCus, TouchCus, ViewCus } from 'components';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
interface IProps {
  title?: string;
  onChange: (selected: boolean, title: string) => void;
  value?: boolean;
}
const Checkbox: React.FC<IProps> = ({ title, onChange, value }) => {
  const [selected, setSelected] = React.useState<boolean>(value ?? false);
  const onChecked = React.useCallback(() => {
    setSelected(!selected);
    onChange(!selected, title);
  }, [onChange, selected]);
  return (
    <ViewCus style={styles.container}>
      <TouchCus onPress={onChecked} activeOpacity={0.8} style={styles.boxCheck}>
        {selected ? (
          <IconApp name={IconName.Check} size={16} color={Colors.main} />
        ) : null}
      </TouchCus>
      {title && (
        <TextCus useI18n ml-8>
          {title}
        </TextCus>
      )}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  boxCheck: {
    width: 24,
    height: 24,
    backgroundColor: Colors.transparent,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.greyA6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Checkbox;
