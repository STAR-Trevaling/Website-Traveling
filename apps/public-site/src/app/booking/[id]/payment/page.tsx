import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/site-header";
import { PaymentClient } from "./payment-client";

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

  const cookieStore = await cookies();
  const isEn = cookieStore.get("star_travels_locale")?.value === "en";

  return (
    <>
      <SiteHeader overlay={false} />
      <main className="template-page-bg min-h-screen text-[#282828] px-4 sm:px-6 py-8 sm:py-12 md:px-12 lg:px-16">
        <PaymentClient
          bookingId={bookingId}
          initialBookingCode={bookingCode}
          initialAmount={amount}
          isEn={isEn}
        />
      </main>
    </>
  );
}
