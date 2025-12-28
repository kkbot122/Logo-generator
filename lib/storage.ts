import { UTApi } from "uploadthing/server";

// 1. Initialize the API client
const utapi = new UTApi();

export async function uploadLogoToStorage(
  imageBuffer: Buffer, 
  fileName: string
) {
  // FIX: Cast imageBuffer to 'any' or 'BlobPart' to silence the TS mismatch.
  // At runtime, the File constructor handles Node Buffers perfectly fine.
  const imageFile = new File([imageBuffer as any], fileName, { type: "image/png" });

  try {
    // 3. Upload to UploadThing
    const response = await utapi.uploadFiles([imageFile]);

    // 4. Check for success
    if (response[0].error) {
      throw new Error(response[0].error.message);
    }

    // 5. Return the public URL
    // Note: Use 'url' (standard) or 'appUrl'. 'ufsUrl' might be deprecated/undefined depending on version.
    return response[0].data.ufsUrl; 
    
  } catch (error) {
    console.error("UploadThing Error:", error);
    throw new Error("Failed to upload logo");
  }
}