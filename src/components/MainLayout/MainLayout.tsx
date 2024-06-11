import {
  Header,
  IconCus,
  SafeAreaStatusBar,
  SafeAreaViewCus,
} from 'components';
import React from 'react';

const MainLayout = (props: IMainLayoutProps) => {
  const { children, showAuthHeader, titleAuthHeader } = props;

  return (
    <SafeAreaViewCus>
      <>
        <SafeAreaStatusBar />
        {showAuthHeader && (
          <Header
            title={titleAuthHeader ?? ''}
            renderLeft={() => (
              <IconCus
                name={'chevron-left'}
                size={18}
                // color={Colors.white}
              />
            )}
          />
        )}
        {children}
      </>
    </SafeAreaViewCus>
  );
};

export default MainLayout;

export interface IMainLayoutProps {
  children?: React.ReactNode;
  statusBar?: any;
  showAuthHeader?: boolean;
  titleAuthHeader?: string;
  style?: any;
  edges?: any;
  testID?: string;
}
