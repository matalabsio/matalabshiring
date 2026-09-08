import { NextResponse } from "next/server";
import { saveApplication } from "@/lib/applications";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/lib/types";
import { validateApplication } from "@/lib/validation";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function getRateLimitConfig() {
  const limit = Number(process.env.RATE_LIMIT_MAX) || 5;
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
  return { limit, windowMs };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`applications:${ip}`, getRateLimitConfig());

  if (!rate.success) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((rate.resetAt - Date.now()) / 1000),
    );

    const body: ApiErrorResponse = {
      success: false,
      message:
        "Too many applications from this network. Please try again later.",
    };

    return NextResponse.json(body, {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(rate.resetAt),
      },
    });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    const body: ApiErrorResponse = {
      success: false,
      message: "Invalid JSON body.",
    };
    return NextResponse.json(body, { status: 400 });
  }

  const validation = validateApplication(payload);

  if (!validation.success) {
    const body: ApiErrorResponse = {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      errors: validation.errors,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const application = await saveApplication(validation.data, { ip });

    const body: ApiSuccessResponse = {
      success: true,
      message: "Application submitted successfully.",
      applicationId: application.id,
    };

    return NextResponse.json(body, {
      status: 201,
      headers: {
        "X-RateLimit-Remaining": String(rate.remaining),
        "X-RateLimit-Reset": String(rate.resetAt),
      },
    });
  } catch (error) {
    console.error("[api/applications] failed to save", error);

    const message =
      error instanceof Error && error.message.includes("Notion")
        ? error.message
        : "Unable to save your application. Please try again.";

    const body: ApiErrorResponse = {
      success: false,
      message,
    };
    return NextResponse.json(body, { status: 500 });
  }
}
