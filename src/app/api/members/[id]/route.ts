import { connectToDB } from "@/lib/connectToDB";
import { Members } from "@/lib/schemas/memberModels";

import { NextRequest, NextResponse } from "next/server";


interface ErrorResponse {
  message: string;
}

// Define the context type for route parameters
interface RouteContext {
  params: Promise<{ id: string }>; 
}



export async function GET(
  req: NextRequest,
  context: RouteContext
): Promise<NextResponse<typeof Members | ErrorResponse>> {
  const { id } = await context.params;

  try {
    await connectToDB();

    // Determine the query based on the input
    let query;
    if (id.includes('@')) {
      // Search by email if the ID contains '@'
      query = { emailAddress: id };
    } else if (id.startsWith('GM-') || id.startsWith('LM-')) {
      // Search by membershipID if it starts with GM- or LM-
      query = { membershipID: id };
    } else {
      // Fallback: search by either membershipID or email
      query = {
        $or: [
          { membershipID: id },
          { emailAddress: id }
        ]
      };
    }

    const member = await Members.findOne(query);

    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


 
export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const data = await req.json();

  await connectToDB();

  try {
    // Determine the query based on the input
    let query;
    if (id.includes('@')) {
      // Search by email if the ID contains '@'
      query = { emailAddress: id };
    } else if (id.startsWith('GM-') || id.startsWith('LM-')) {
      // Search by membershipID if it starts with GM- or LM-
      query = { membershipID: id };
    } else {
      // Fallback: search by either membershipID or email
      query = {
        $or: [
          { membershipID: id },
          { emailAddress: id }
        ]
      };
    }

    const updatedMember = await Members.findOneAndUpdate(
      query,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Member successfully updated",
        data: updatedMember
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update member:", error);
    return NextResponse.json(
      { message: "Failed to update member" },
      { status: 500 }
    );
  }
}