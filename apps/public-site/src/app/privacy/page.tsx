import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ShieldCheck, Lock, FileText, UserCheck, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Dữ Liệu Cá Nhân | Star Travels Vietnam",
  description:
    "Chính sách bảo vệ và xử lý dữ liệu cá nhân tuân thủ Nghị định 13/2023/NĐ-CP của Công ty TNHH STAR Travels Việt Nam.",
};

export default async function PrivacyPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen text-[#282828] pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 md:px-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang Chủ", href: "/" },
                { label: isEn ? "Privacy Policy" : "Chính Sách Bảo Mật" },
              ]}
            />
          </div>

          <div className="rounded-[2px] bg-white/90 backdrop-blur-md p-6 sm:p-10 shadow-sm border border-slate-200/80 mb-8">
            <span className="inline-block px-3 py-1 rounded-[2px] bg-[#0098a2]/15 text-[#007a82] border border-[#0098a2]/25 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              {isEn ? "Legal & Compliance" : "Pháp Lý & Tuân Thủ"}
            </span>
            <h1 className="script-title text-3xl sm:text-4xl md:text-5xl text-[#0f172a] leading-tight">
              {isEn
                ? "Personal Data Protection & Privacy Policy"
                : "Chính Sách Bảo Vệ & Xử Lý Dữ Liệu Cá Nhân"}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-light">
              {isEn
                ? "Compliant with Decree No. 13/2023/ND-CP on Personal Data Protection (Effective July 1, 2023)"
                : "Tuân thủ Nghị định số 13/2023/NĐ-CP của Chính phủ về Bảo vệ dữ liệu cá nhân (Hiệu lực từ 01/07/2023)"}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <ShieldCheck className="size-5 text-[#da251d]" />
                {isEn ? "1. Data Controller & Processor Information" : "1. Thông Tin Bên Kiểm Soát & Xử Lý Dữ Liệu"}
              </h2>
              <div className="mt-4 space-y-2 text-xs sm:text-sm">
                <p><strong>{isEn ? "Company Name:" : "Tên doanh nghiệp:"}</strong> CÔNG TY TNHH STAR TRAVELS VIỆT NAM</p>
                <p><strong>{isEn ? "Tax Code:" : "Mã số thuế (MST):"}</strong> 0110896868 do Sở Kế hoạch & Đầu tư TP. Hà Nội cấp</p>
                <p><strong>{isEn ? "International Tour Operator License:" : "Giấy phép kinh doanh lữ hành quốc tế:"}</strong> 01-2026/TCDL-GP LHQT</p>
                <p><strong>{isEn ? "Head Office:" : "Trụ sở chính:"}</strong> Tòa nhà Heritage, 18 Phố Tràng Tiền, Phường Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội</p>
                <p><strong>{isEn ? "Hotline 24/7:" : "Tổng đài hỗ trợ:"}</strong> 1900 6868 · <strong>Email DPO:</strong> privacy@startravels.vn</p>
              </div>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <FileText className="size-5 text-[#0098a2]" />
                {isEn ? "2. Categories of Personal Data Collected" : "2. Các Loại Dữ Liệu Cá Nhân Thu Thập"}
              </h2>
              <ul className="mt-4 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>{isEn ? "Basic Identifiers:" : "Dữ liệu định danh cơ bản:"}</strong> {isEn ? "Full name, phone number, email address, nationality, residential address." : "Họ và tên, số điện thoại, địa chỉ thư điện tử (email), quốc tịch, nơi cư trú."}</li>
                <li><strong>{isEn ? "Travel Documents:" : "Dữ liệu phục vụ xuất nhập cảnh & lưu trú:"}</strong> {isEn ? "Passport number / National ID, date of birth, gender, dietary preferences or medical emergency contacts (if provided voluntarily)." : "Số hộ chiếu / Căn cước công dân, ngày tháng năm sinh, giới tính, thông tin liên hệ khẩn cấp hoặc yêu cầu sức khỏe đặc biệt (nếu khách hàng tự nguyện cung cấp)."}</li>
                <li><strong>{isEn ? "Transaction & Booking Data:" : "Dữ liệu giao dịch & đặt chỗ:"}</strong> {isEn ? "Tour booking code, itinerary history, invoice information, payment method, VietQR transfer references." : "Mã đặt tour (booking code), lịch sử hành trình, thông tin xuất hóa đơn VAT, phương thức thanh toán, mã tham chiếu chuyển khoản VietQR."}</li>
                <li><strong>{isEn ? "Technical & Navigation Data:" : "Dữ liệu kỹ thuật & phiên duyệt web:"}</strong> {isEn ? "IP address, browser type, device information, session cookies for multilingual preferences and cart state." : "Địa chỉ IP, loại trình duyệt, thông tin thiết bị, cookies ghi nhớ ngôn ngữ và phiên làm việc."}</li>
              </ul>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <Lock className="size-5 text-amber-600" />
                {isEn ? "3. Purposes of Data Processing" : "3. Mục Đích Xử Lý Dữ Liệu"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm">
                {isEn
                  ? "STAR Travels processes customer personal data strictly for legitimate operational purposes:"
                  : "STAR Travels chỉ xử lý dữ liệu cá nhân cho các mục đích hợp pháp phục vụ cung cấp dịch vụ lữ hành:"}
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>{isEn ? "Fulfilling tour reservations, issuing electronic tickets and travel vouchers." : "Thực hiện xác nhận đặt chỗ, phát hành vé điện tử và chứng từ du lịch."}</li>
                <li>{isEn ? "Purchasing mandatory domestic and international travel insurance per Tourism Law 2017." : "Mua bảo hiểm du lịch bắt buộc cho du khách theo Luật Du lịch 2017."}</li>
                <li>{isEn ? "Coordinating with airlines, hotels, transport providers and official tour guides." : "Điều phối dịch vụ với hãng hàng không, khách sạn, đơn vị vận chuyển và hướng dẫn viên."}</li>
                <li>{isEn ? "Processing refunds, resolving disputes, and providing 24/7 customer care." : "Xử lý hoàn hủy, giải quyết khiếu nại và hỗ trợ khẩn cấp 24/7."}</li>
                <li>{isEn ? "Fulfilling tax and financial reporting obligations required by Vietnamese law." : "Thực hiện nghĩa vụ thuế, tài chính theo quy định của pháp luật Việt Nam."}</li>
              </ul>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <UserCheck className="size-5 text-emerald-600" />
                {isEn ? "4. Customer Rights (Article 9, Decree 13/2023/ND-CP)" : "4. Quyền Của Khách Hàng (Điều 9 Nghị Định 13/2023/NĐ-CP)"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm">
                {isEn
                  ? "As a data subject, you have the following guaranteed rights under Vietnamese law:"
                  : "Với tư cách là chủ thể dữ liệu, quý khách có đầy đủ các quyền theo quy định của pháp luật Việt Nam:"}
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="text-slate-800 block mb-0.5">{isEn ? "Right to be Informed & Consent" : "Quyền được biết & Quyền đồng ý"}</strong>
                  <span className="text-slate-500 font-light">{isEn ? "Know what data is collected and give or withdraw consent at any time." : "Biết rõ mục đích thu thập và có quyền cấp hoặc rút lại sự đồng ý."}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="text-slate-800 block mb-0.5">{isEn ? "Right of Access & Correction" : "Quyền truy cập & Chỉnh sửa"}</strong>
                  <span className="text-slate-500 font-light">{isEn ? "Request a copy of your personal data or update incorrect details." : "Yêu cầu cung cấp dữ liệu cá nhân hoặc chỉnh sửa thông tin chưa chính xác."}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="text-slate-800 block mb-0.5">{isEn ? "Right to Erasure" : "Quyền yêu cầu xóa dữ liệu"}</strong>
                  <span className="text-slate-500 font-light">{isEn ? "Request deletion of data after tour completion and legal retention periods." : "Yêu cầu xóa dữ liệu sau khi kết thúc dịch vụ (trừ trường hợp pháp luật bắt buộc lưu trữ)."}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100">
                  <strong className="text-slate-800 block mb-0.5">{isEn ? "Right to Lodge Complaints" : "Quyền khiếu nại & Khởi kiện"}</strong>
                  <span className="text-slate-500 font-light">{isEn ? "Lodge complaints with the Ministry of Public Security (A05) if violations occur." : "Khiếu nại tới cơ quan quản lý chuyên trách (Cục An ninh mạng A05 - Bộ Công An)."}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[2px] bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                <AlertCircle className="size-5 text-[#da251d]" />
                {isEn ? "5. Contact Data Protection Officer (DPO)" : "5. Kênh Liên Hệ Bảo Vệ Dữ Liệu Cá Nhân"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm">
                {isEn
                  ? "To exercise any of your rights or report privacy concerns, please contact our Data Protection Officer:"
                  : "Để thực hiện các quyền của mình hoặc phản ánh thắc mắc về bảo mật dữ liệu, quý khách vui lòng liên hệ:"}
              </p>
              <div className="mt-3 p-4 bg-red-50/50 rounded border border-red-100 text-xs sm:text-sm space-y-1">
                <p><strong>Bộ phận Bảo vệ Dữ liệu (DPO) - STAR Travels Vietnam</strong></p>
                <p>Email: <a href="mailto:privacy@startravels.vn" className="text-[#da251d] font-semibold underline">privacy@startravels.vn</a></p>
                <p>Hotline: <strong>1900 6868</strong> (Phục vụ 24/7)</p>
                <p>Địa chỉ: Tòa nhà Heritage, 18 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
