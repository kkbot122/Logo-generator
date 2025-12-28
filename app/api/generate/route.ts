import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadLogoToStorage } from "@/lib/storage";
import { groq, hf } from "@/lib/ai"; 
import fonts from "@/data/fonts.json";
import { colord, extend } from "colord";
import harmonies from "colord/plugins/harmonies";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth"; 

// Enable the harmony plugin for color theory
extend([harmonies]);

export async function POST(req: Request) {
  try {
    // 1. Authenticate the User
    const session = await getServerSession(authOptions);

    // If no user is logged in, return 401 Unauthorized
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to generate a logo." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2. Parse Input
    const { prompt, vibe } = await req.json(); // vibe = "tame" | "wild"

    // 3. Prepare Font Menu (Filter based on Vibe)
    const availableFonts = fonts
      .filter((f) => f.category === vibe)
      .map((f) => f.name)
      .join(", ");

    // 4. AI Step 1: Brand Strategy (Llama 3 via Groq)
    console.log("Generating brand strategy for user:", userId);
    const strategyResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a Senior Brand Designer. Return ONLY valid JSON.
                    You must pick a font from this list: [${availableFonts}].
                    Do not hallucinate fonts outside this list.`,
        },
        {
          role: "user",
          content: `Create a brand identity for: "${prompt}". 
                    The user wants a "${vibe}" style.
                    
                    Return JSON with this exact schema:
                    {
                      "brand_name": "String (Short, catchy name)",
                      "base_color": "Hex Code (e.g. #FF5733)",
                      "color_harmony": "String (One of: analogous, complementary, triadic, split-complementary)",
                      "font_name": "String (Must be one from the provided list)",
                      "logo_prompt": "String (A highly detailed, descriptive prompt for an AI image generator to create a minimalist vector logo. Mention white background.)",
                      "rationale": "String (Why you chose this vibe)"
                    }`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const aiData = JSON.parse(
      strategyResponse.choices[0]?.message?.content || "{}"
    );
    
    console.log("AI Brand Data:", aiData);

    // 5. Math Step: Generate Perfect Color Palette
    const palette = colord(aiData.base_color)
      .harmonies(aiData.color_harmony as any)
      .map((c) => c.toHex());
    
    console.log("Generated color palette:", palette);

    // 6. AI Step 2: Image Generation (Flux via HuggingFace)
    console.log("Generating image with prompt:", aiData.logo_prompt);
    
    // Explicitly cast result to Blob to fix TypeScript error
    const imageBlob = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: `${aiData.logo_prompt}, vector style, flat design, white background, high quality, no text`,
      parameters: { 
        num_inference_steps: 4,
        guidance_scale: 7.5
      },
    }) as unknown as Blob;

    console.log("Image Blob received. Size:", imageBlob.size, "Type:", imageBlob.type);
    
    // Convert Blob to ArrayBuffer -> Buffer for UploadThing
    const arrayBuffer = await imageBlob.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);
    
    console.log("Image buffer size:", imageBuffer.length);
    
    // 7. Storage Step: Upload to UploadThing
    // Organized by userID for better file management
    const fileName = `logos/${userId}/${Date.now()}.png`; 
    console.log("Uploading to UploadThing with filename:", fileName);
    
    const logoUrl = await uploadLogoToStorage(imageBuffer, fileName);
    console.log("Logo uploaded to:", logoUrl);

    // 8. Database Step: Save to Neon using REAL User ID
    const newBrand = await prisma.brandIdentity.create({
      data: {
        userId: userId, // <--- Authenticated User ID from session
        brandName: aiData.brand_name,
        colors: {
          base: aiData.base_color,
          harmony: aiData.color_harmony,
          palette: palette,
        },
        fonts: {
          selected: aiData.font_name,
          category: vibe,
        },
        logoUrl: logoUrl,
      },
    });

    console.log("Saved to database with ID:", newBrand.id);

    return NextResponse.json({
      success: true,
      brand: {
        id: newBrand.id,
        brandName: aiData.brand_name,
        logoUrl: logoUrl,
        colors: {
          base: aiData.base_color,
          harmony: aiData.color_harmony,
          palette: palette,
        },
        font: aiData.font_name,
        prompt: aiData.logo_prompt,
        rationale: aiData.rationale,
      },
    });

  } catch (error: any) {
    console.error("Generation Error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to generate brand identity", 
        details: error.message,
      },
      { status: 500 }
    );
  }
}