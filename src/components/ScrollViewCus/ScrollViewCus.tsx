import React, { ReactNode } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { BaseStyle } from 'theme';
interface IProps extends ScrollViewProps {
  children: ReactNode;
}
const ScrollViewCus: React.FC<IProps> = ({ children, ...rest }) => {
  return (
    <ScrollView
      contentContainerStyle={[BaseStyle.flexGrow1]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...rest}>
      {children}
    </ScrollView>
  );
};
export default ScrollViewCus;
