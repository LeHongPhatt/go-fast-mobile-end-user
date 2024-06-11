import React from 'react';
import { HomeLayout } from 'components';
import { IMainLayoutProps } from 'types';

export default function withWrapper(
  WrapperComponent,
  params: IMainLayoutProps,
) {
  return props => {
    return (
      <HomeLayout {...params} header={{ ...params.header }}>
        <WrapperComponent {...props} />
      </HomeLayout>
    );
  };
}
