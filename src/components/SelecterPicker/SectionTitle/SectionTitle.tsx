import React from 'react';
import { StyleSheet } from 'react-native';
import { TextCus, ViewCus } from 'components';
interface Props {
  title: string;
  sectionDescription?: string;
}
const SectionTilte: React.FC<Props> = ({ title, sectionDescription }) => {
  return (
    <ViewCus key={title} style={styles.container}>
      <TextCus bold heading5>
        {title}
      </TextCus>
      {sectionDescription ? <TextCus>{sectionDescription}</TextCus> : null}
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
  },
});
export default SectionTilte;
