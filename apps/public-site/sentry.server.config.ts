import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.1"),
  environment: process.env.ENVIRONMENT || process.env.NEXT_PUBLIC_ENVIRONMENT || process.env.NODE_ENV || "production",
  enabled: Boolean(SENTRY_DSN),
});
