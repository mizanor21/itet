import { connectToDB } from "@/lib/connectToDB";
import { Members } from "@/lib/schemas/memberModels";

import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await Members.find();
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Remove membershipID if empty, null, or undefined
    if (!data.membershipID) {
      delete data.membershipID;
    }

    await connectToDB();
    await Members.create(data);

    return NextResponse.json({ message: "data created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { message: "Failed to create data" },
      { status: 500 }
    );
  }
}




export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deleted = await Members.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete data" },
      { status: 500 }
    );
  }
}
