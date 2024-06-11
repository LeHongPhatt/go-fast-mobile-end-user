import { HomeLayout, TextCus, ViewCus } from 'components';
import React from 'react';
import { BaseStyle, Colors } from 'theme';

const Term: React.FC = () => {
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'account.term',
        iconColor: Colors.white,
      }}
      isForForm>
      <ViewCus style={[BaseStyle.wrapperDisable]}>
        <TextCus heading5>Điều khoản sử dụng</TextCus>
      </ViewCus>
      <ViewCus
        style={[BaseStyle.wrapperMain, { backgroundColor: Colors.white }]}>
        <TextCus heading5 color={Colors.black} mb-5>
          I. Định nghĩa và Diễn giản
        </TextCus>
        <TextCus>
          Ứng dụng GO FAST là một ứng dụng di động cung cấp dịch vụ sàn thương
          mại điện tử trong lĩnh vực giao nhận thực phẩm. Ứng dụng giúp kết nối
          giữa các nhà cung cấp thực phẩm, nhà cung cấp dịch vụ giao hàng và
          những người cần sử dụng dịch vụ giao nhận thực phẩm ("Dịch vụ")
        </TextCus>
        <TextCus>
          Khách hàng: là các cá nhân và tổ chức có nhu cầu sử dụng dịch vụ giao
          thức ăn sử dụng GO FAST để đăng thông báo về nhu cầu được sử dụng dịch
          vụ Đối tác giao hàng: là nhà cung cấp dịch vụ giao thực phẩm sử dụng
          GO FAST để kết nối đến khách hàng và nhà hàng
        </TextCus>
        <TextCus>
          Nhà hàng: là các cá nhân và tổ chức được đăng trên GO FAST, có hoặc
          không có nhu cầu quảng cáo và bán thực phẩm, là những người có thể
          cung cấp thực phẩm mà Khách hàng yêu cầu;
        </TextCus>
        <TextCus>
          Người dùng: Các cá nhân và tổ chức đăng ký để sử dụng ứng dụng GO FAST
        </TextCus>
        <TextCus>
          Dịch vụ giao nhận đồ ăn: là dịch vụ giao nhận đồ ăn được giao dịch qua
          GO FAST
        </TextCus>
        <TextCus>
          Sở hữu trí tuệ: là bất kỳ bằng sáng chế, bản quyền, thiết kế đã đăng
          ký hoặc chưa đăng ký, quyền đối với thiết kế, nhãn hiệu đã đăng ký
          hoặc chưa đăng ký, nhãn hiệu dịch vụ hoặc sở hữu công cộng, công
          nghiệp hoặc sở hữu trí tuệ khác, bao gồm các ứng dụng cho bất kỳ điều
          nào ở trên.
        </TextCus>
      </ViewCus>
    </HomeLayout>
  );
};
export default Term;
