import { dbConnect } from "@/lib/mongodb";
import Admission from "@/models/Admission";
import { NextResponse } from "next/server";

// DELETE - নির্দিষ্ট আবেদন ডিলিট
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;  // ✅ await

    const deletedAdmission = await Admission.findByIdAndDelete(id);
    if (!deletedAdmission) {
      return NextResponse.json(
        { success: false, error: "আবেদনটি খুঁজে পাওয়া যায়নি" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, message: "সফলভাবে ডিলিট করা হয়েছে" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Admission DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "ডিলিট করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}

// PATCH - আবেদনের স্ট্যাটাস আপডেট
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;  // ✅ await
    const body = await req.json();

    const updatedAdmission = await Admission.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );

    if (!updatedAdmission) {
      return NextResponse.json(
        { success: false, error: "আপডেট করা সম্ভব হয়নি" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "সফলভাবে আপডেট করা হয়েছে",
        data: updatedAdmission,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Admission PATCH Error:", error);
    return NextResponse.json(
      { success: false, error: "আপডেট করতে সমস্যা হয়েছে" },
      { status: 500 },
    );
  }
}