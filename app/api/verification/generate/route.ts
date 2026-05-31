import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import {
  createVerificationCode,
  deleteVerificationCode,
} from "@/lib/db/queries/verification";

export async function POST(
  request: NextRequest
) {
  try {
    const { playerTag, apiToken } =
      await request.json();

    if (!playerTag) {
      return NextResponse.json(
        {
          error: "Player tag required",
        },
        {
          status: 400,
        }
      );
    }

    const code = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();

    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    ).toISOString();

    deleteVerificationCode(playerTag);

    createVerificationCode(
      playerTag,
      code,
      expiresAt
    );

    return NextResponse.json({
      playerTag,
      code,
      expiresAt,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate code",
      },
      {
        status: 500,
      }
    );
  }
}