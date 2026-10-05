"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Làm thế nào để đặt một tour trải nghiệm trên Star Travels?",
    answer: "Bạn có thể duyệt qua danh mục Tours hoặc Trải nghiệm, chọn ngày khởi hành và số lượng khách, sau đó nhấn Đặt Tour Ngay. Chuyên viên Star Travels sẽ xác nhận đặt chỗ và gửi vé điện tử (Voucher) cùng hướng dẫn chi tiết qua email trong vòng 30 phút.",
  },
  {
    question: "Chính sách hủy hoặc đổi ngày khởi hành như thế nào?",
    answer: "Star Travels áp dụng chính sách đổi ngày miễn phí trước 7 ngày so với ngày khởi hành. Với trường hợp hủy tour, bạn sẽ nhận hoàn tiền 100% nếu thông báo trước 14 ngày, hoặc 70% trước 7 ngày, bảo đảm quyền lợi tối đa cho du khách.",
  },
  {
    question: "Các tour có bao gồm xe đưa đón và hướng dẫn viên bản địa không?",
    answer: "Tất cả các tour trên Star Travels đều là tour trọn gói cao cấp, bao gồm xe Limousine đưa đón tận nơi, hướng dẫn viên chuyên nghiệp người địa phương am hiểu lịch sử văn hóa, bảo hiểm du lịch tối đa 100.000.000 VNĐ và toàn bộ bữa ăn trong lịch trình.",
  },
  {
    question: "Star Travels có hỗ trợ thiết kế Private Tour (tour riêng) cho gia đình không?",
    answer: "Hoàn toàn có! Chúng tôi chuyên may đo các lịch trình Private Tour độc bản cho gia đình, cặp đôi hoặc đoàn doanh nghiệp với xe riêng, hướng dẫn viên riêng và thời gian biểu linh hoạt theo sở thích của bạn.",
  },
  {
    question: "Star Travels bảo đảm an toàn cho các hoạt động mạo hiểm như thế nào?",
    answer: "Các hoạt động lặn ngắm san hô tại Phú Quốc, chèo kayak Vịnh Hạ Long hay trekking Sa Pa đều được trang bị thiết bị tiêu chuẩn an toàn hàng hải quốc tế, có huấn luyện viên kèm sát 1:1 hoặc nhóm nhỏ, và luôn tuân thủ kiểm định thời tiết trước giờ xuất phát.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="border border-slate-200/80 bg-white/90 rounded-[2px] overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition hover:bg-slate-50/80 cursor-pointer"
            >
              <span className="text-sm md:text-base font-semibold text-[#1e293b]">
                {faq.question}
              </span>
              <ChevronDown
                className={`size-5 text-slate-700 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-xs md:text-sm font-light text-[#555] leading-relaxed border-t border-slate-100">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
