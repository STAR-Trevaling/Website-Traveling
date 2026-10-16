import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PaymentReturnClient } from "./payment-return-client";

export const metadata: Metadata = {
  title: "Kết Quả Thanh Toán Tour | Star Travels Vietnam",
  description: "Trang tiếp nhận và xác thực kết quả thanh toán từ cổng VNPay Sandbox.",
};

interface PaymentReturnPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentReturnPage({ searchParams }: PaymentReturnPageProps) {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";
  const params = await searchParams;

  const txnRef = typeof params.vnp_TxnRef === "string" ? params.vnp_TxnRef : "";
  const responseCode = typeof params.vnp_ResponseCode === "string" ? params.vnp_ResponseCode : "";
  const amount = typeof params.vnp_Amount === "string" ? params.vnp_Amount : "";
  const bankCode = typeof params.vnp_BankCode === "string" ? params.vnp_BankCode : "";

  return (
    <>
      <SiteHeader overlay={false} />

      <main className="template-page-bg min-h-screen px-4 sm:px-6 py-8 sm:py-16 md:px-12 lg:px-16 flex flex-col justify-start">
        <div className="mx-auto max-w-7xl w-full">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-10 max-w-xl mx-auto">
            <Breadcrumb
              items={[
                { label: isEn ? "Home" : "Trang Chủ", href: "/" },
                { label: isEn ? "Tours" : "Tour Tuyển Chọn", href: "/tours" },
                { label: isEn ? "Payment Status" : "Kết Quả Thanh Toán" },
              ]}
            />
          </div>

          <PaymentReturnClient
            txnRef={txnRef}
            responseCode={responseCode}
            amount={amount}
            bankCode={bankCode}
            isEn={isEn}
          />
        </div>
      </main>
    </>
  );
}
