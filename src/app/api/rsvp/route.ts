import { NextResponse } from "next/server";

// In-memory fallback storage for the runtime session
interface RsvpEntry {
  id: string;
  name: string;
  attending: string;
  guestCount: number;
  message: string;
  createdAt: string;
}

const memoryRsvps: RsvpEntry[] = [
  {
    id: "demo-1",
    name: "Dr. Ananth & Mrs. Shobha",
    attending: "yes",
    guestCount: 2,
    message: "Hearty congratulations to Aadhya and Arjun! May your journey be blessed with endless happiness.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Kiran Kumar",
    attending: "yes",
    guestCount: 1,
    message: "Eagerly looking forward to the celebration at The Leela Palace!",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: memoryRsvps,
      totalGuests: memoryRsvps
        .filter((r) => r.attending === "yes")
        .reduce((sum, r) => sum + (r.guestCount || 1), 0),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve RSVPs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, guestCount, message } = body;

    if (!name || !attending) {
      return NextResponse.json(
        { success: false, error: "Name and attendance status are required" },
        { status: 400 }
      );
    }

    const newEntry: RsvpEntry = {
      id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: String(name).trim(),
      attending: attending === "yes" ? "yes" : "no",
      guestCount: attending === "yes" ? Math.min(Math.max(Number(guestCount) || 1, 1), 10) : 0,
      message: message ? String(message).trim() : "",
      createdAt: new Date().toISOString(),
    };

    memoryRsvps.unshift(newEntry);

    return NextResponse.json({
      success: true,
      message: "RSVP successfully recorded",
      data: newEntry,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}

