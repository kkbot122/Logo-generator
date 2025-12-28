import { uploadLogoToStorage } from "@/lib/storage";

export async function GET() {
  // Create a fake "image" (a text file disguised as a png for testing)
  const buffer = Buffer.from("Test Image Content");
  
  try {
    const url = await uploadLogoToStorage(buffer, "test-logo.png");
    return Response.json({ success: true, url });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}