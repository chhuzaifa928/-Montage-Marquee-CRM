import { NextResponse } from "next/server";
import { MontageDataStore } from "@/lib/dataStore";

export async function GET() {
  try {
    const menus = MontageDataStore.getMenus();
    return NextResponse.json({
      success: true,
      menus,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch menus: " + String(error) },
      { status: 500 }
    );
  }
}
