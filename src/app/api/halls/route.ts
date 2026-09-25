import { NextResponse } from "next/server";
import { MontageDataStore } from "@/lib/dataStore";

export async function GET() {
  try {
    const halls = MontageDataStore.getHalls();
    return NextResponse.json({
      success: true,
      halls,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch halls: " + String(error) },
      { status: 500 }
    );
  }
}
