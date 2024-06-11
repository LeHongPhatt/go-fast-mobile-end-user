import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { TmodeContent } from 'types';

const SafeAreaStatusBar = ({
  modeContent,
  backgroundColor,
}: ISafeAreaStatusBar) => {
  const [mode, setMode] = useState(modeContent ?? 'dark-content');

  useEffect(() => modeContent && setMode(modeContent), [modeContent]);

  return <StatusBar barStyle={mode} backgroundColor={backgroundColor} />;
};

export interface ISafeAreaStatusBar {
  backgroundColor?: string;
  modeContent?: TmodeContent;
}

export default SafeAreaStatusBar;
