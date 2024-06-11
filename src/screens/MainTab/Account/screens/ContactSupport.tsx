import { HomeLayout, ViewCus } from 'components';
import { showCallPhone } from 'components/CallPhone/CallPhone';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'screens/MainTab/Account/components';
import { Colors } from 'theme';

const ContactSupport: React.FC = () => {
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'account.support',
        iconColor: Colors.white,
      }}>
      <ViewCus px-16>
        <ListItem
          name="Hỗ trợ qua chat"
          onPress={() => showCallPhone({ phone: '19008079' })}
          style={[styles.clearPadding]}
          styleLine={[styles.line]}
        />
        <ListItem
          name="Hỗ trợ qua điện thoại"
          onPress={() => showCallPhone({ phone: '19008079' })}
          style={[styles.clearPadding]}
          styleLine={[styles.line]}
        />
        <ListItem
          name="Hỗ trợ qua email"
          onPress={() => showCallPhone({ phone: '19008079' })}
          style={[styles.clearPadding]}
          styleLine={[styles.line]}
        />
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  clearPadding: {
    paddingHorizontal: 0,
  },
  line: {
    height: 1,
    backgroundColor: Colors.greyEE,
  },
});
export default ContactSupport;
