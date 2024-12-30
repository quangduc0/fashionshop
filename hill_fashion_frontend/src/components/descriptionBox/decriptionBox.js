import React from "react";
import { memo } from "react";
import './decriptionBox.css';

const DescriptionBox = () => {
    return (
        <div className="decriptionbox">
            <div className="decriptionbox-navigator">
                <div className="decriptionbox-nav-box">Mô tả</div>
                <div className="decriptionbox-nav-box fade">Đánh giá (122)</div>
            </div>
            <div className="decriptionbox-decription">
                <p>Trang web thương mại điện tử là một nền tảng trực tuyến giúp kết nối việc mua bán 
                    sản phẩm hoặc dịch vụ qua internet một cách dễ dàng. Đây là một chợ trực tuyến, 
                    nơi doanh nghiệp và cá nhân có thể giới thiệu sản phẩm, tương tác với khách hàng, 
                    và thực hiện giao dịch mà không cần hiện diện thực tế. Với sự tiện lợi, dễ dàng 
                    tiếp cận, và khả năng kết nối toàn cầu, các trang thương mại điện tử đã trở nên 
                    cực kỳ phổ biến.</p>
                <p>Trên trang web này, sản phẩm hoặc dịch vụ được hiển thị kèm mô tả chi tiết, hình 
                    ảnh minh họa, giá cả, và các tùy chọn như kích thước hay màu sắc. Mỗi sản phẩm 
                    thường có một trang riêng biệt cung cấp đầy đủ thông tin để người mua đưa ra lựa 
                    chọn dễ dàng.</p>
            </div>
        </div>
    );
}

export default memo(DescriptionBox);