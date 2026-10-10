/**
 * STAR Travels - Production-Ready Structured Client Logger & Observability Utility
 * Handles error tracking, PII sanitization, and remote telemetry reporting.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: {
    name?: string;
    message?: string;
    stack?: string;
    digest?: string;
  };
  timestamp?: string;
  url?: string;
}

class ClientLogger {
  private isProduction = process.env.NODE_ENV === "production";

  private sanitize(obj: Record<string, unknown>): Record<string, unknown> {
    const sanitized = { ...obj };
    const piiKeys = ["password", "token", "secret", "cvv", "credit_card", "accessToken"];
    for (const key of Object.keys(sanitized)) {
      if (piiKeys.some((pii) => key.toLowerCase().includes(pii))) {
        sanitized[key] = "[REDACTED]";
      }
    }
    return sanitized;
  }

  private sendTelemetry(payload: LogPayload) {
    if (typeof window === "undefined") return;

    // Optional remote error reporting ingestion
    try {
      const body = JSON.stringify({
        ...payload,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });

      // Use navigator.sendBeacon if available for non-blocking telemetry
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/monitoring/errors", body);
      } else {
        fetch("/api/monitoring/errors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {
          // Silent catch to prevent recursion
        });
      }
    } catch {
      // Telemetry failure should never crash the user application
    }
  }

  public info(message: string, context?: Record<string, unknown>) {
    const sanitizedContext = context ? this.sanitize(context) : undefined;
    if (!this.isProduction) {
      console.info(`[STAR][INFO] ${message}`, sanitizedContext || "");
    }
  }

  public warn(message: string, context?: Record<string, unknown>) {
    const sanitizedContext = context ? this.sanitize(context) : undefined;
    console.warn(`[STAR][WARN] ${message}`, sanitizedContext || "");
  }

  public error(message: string, error?: Error & { digest?: string }, context?: Record<string, unknown>) {
    const sanitizedContext = context ? this.sanitize(context) : undefined;
    console.error(`[STAR][ERROR] ${message}`, error || "", sanitizedContext || "");

    // 1. Send Sentry exception or message
    try {
      import("@sentry/nextjs").then((Sentry) => {
        if (error) {
          Sentry.captureException(error, {
            extra: sanitizedContext,
            tags: { digest: error.digest || "logger_error" },
          });
        } else {
          Sentry.captureMessage(message, {
            level: "error",
            extra: sanitizedContext,
          });
        }
      }).catch(() => {
        // Fallback gracefully
      });
    } catch {
      // Non-blocking
    }

    // 2. Transmit structured telemetry beacon
    this.sendTelemetry({
      level: "error",
      message,
      context: sanitizedContext,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
            digest: error.digest,
          }
        : undefined,
    });
  }
}


export const logger = new ClientLogger();
