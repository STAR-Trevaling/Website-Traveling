import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeader } from "@/components/layout/site-header";
import { PaymentClient, type PaymentClientProps } from "./payment-client";

interface PaymentPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingPaymentPage({
  params,
  searchParams,
}: PaymentPageProps) {
  const resolvedParams = await params;
  const bookingId = decodeURIComponent(resolvedParams.id);

  const resolvedSearch = searchParams ? await searchParams : {};
  const bookingCode =
    typeof resolvedSearch.booking_code === "string"
      ? resolvedSearch.booking_code
      : bookingId;
  const amount =
    typeof resolvedSearch.amount === "string" ? resolvedSearch.amount : undefined;

  // 1. Kiểm tra xác thực người dùng: Khách chưa đăng nhập phải được chuyển hướng đến /login
  const user = await getCurrentUser();
  if (!user) {
    const searchPairs: string[] = [];
    for (const [key, val] of Object.entries(resolvedSearch)) {
      if (typeof val === "string") {
        searchPairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
      }
    }
    const searchString = searchPairs.length > 0 ? `?${searchPairs.join("&")}` : "";
    const returnUrl = `/booking/${encodeURIComponent(bookingId)}/payment${searchString}`;
    redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}&reason=payment`);
  }

  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  const initialGateway: NonNullable<PaymentClientProps["initialGateway"]> =
    resolvedSearch.gateway === "cash"
      ? "cash"
      : resolvedSearch.gateway === "vnpay"
      ? "vnpay"
      : "vietqr";

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <PaymentClient
          bookingId={bookingId}
          initialBookingCode={bookingCode}
          initialAmount={amount}
          initialGateway={initialGateway}
          isEn={isEn}
        />
      </main>
    </>
  );
}
