import React from 'react';
import { Skeleton } from 'moti/skeleton';
import { MotiSkeletonProps } from 'moti/build/skeleton/types';
interface IPageProps
  extends Omit<MotiSkeletonProps, 'colorMode' | 'Gradient'> {}
const AppSkeleton: React.FC<IPageProps> = ({ children, height, width }) => {
  return (
    <Skeleton height={height} width={width} colorMode="light">
      {children}
    </Skeleton>
  );
};
export default AppSkeleton;
