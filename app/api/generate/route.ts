/* src/app/api/generate/route.ts */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadLogoToStorage } from "@/lib/storage";
import { groq, hf } from "@/lib/ai";
import fonts from "@/data/fonts.json";
import { colord, extend } from "colord";
import harmoniesPlugin from "colord/plugins/harmonies";
import mixPlugin from "colord/plugins/mix";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Extend colord with necessary plugins
extend([harmoniesPlugin, mixPlugin]);

export async function POST(req: Request) {
  try {
    // 1. Authenticate the User
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // 2. Parse Input
    const { prompt, vibe } = await req.json();

    // Validate input
    if (!prompt || !vibe) {
      return NextResponse.json(
        { error: "Missing required fields: prompt and vibe" },
        { status: 400 }
      );
    }

    // 3. Prepare Font Menu
    const availableFonts = fonts
      .filter((f) => f.category === vibe)
      .map((f) => f.name)
      .join(", ");

    if (!availableFonts) {
      return NextResponse.json(
        { error: `No fonts found for vibe: ${vibe}` },
        { status: 400 }
      );
    }

    // 4. AI Step 1: Brand Strategy
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

    // Log AI response for debugging
    console.log("AI Response:", strategyResponse.choices[0]?.message?.content);
    
    let aiData;
    try {
      aiData = JSON.parse(strategyResponse.choices[0]?.message?.content || "{}");
      console.log("Parsed AI Data:", aiData);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return NextResponse.json(
        { error: "AI returned invalid JSON response" },
        { status: 500 }
      );
    }

    // Validate AI data has required fields
    const requiredFields = ["brand_name", "base_color", "color_harmony", "font_name", "logo_prompt"];
    for (const field of requiredFields) {
      if (!aiData[field]) {
        console.error(`AI response missing required field: ${field}`, aiData);
        return NextResponse.json(
          { error: `AI response missing required field: ${field}` },
          { status: 500 }
        );
      }
    }

    // ================================================================
    // 5. Color Palette Generation with Error Handling
    // ================================================================

    // Safe color parsing with fallback
    let base;
    try {
      console.log("Attempting to parse color:", aiData.base_color);
      base = colord(aiData.base_color);
      if (!base.isValid()) {
        console.warn("Invalid color format, using fallback");
        throw new Error("Invalid color");
      }
    } catch (error) {
      console.warn("Using fallback color due to:", error);
      base = colord("#3B82F6"); // Nice blue fallback
    }

    // Generate harmony colors safely
    const harmonyType = aiData.color_harmony;
    const validHarmonies = ['analogous', 'complementary', 'triadic', 'split-complementary'];
    const safeHarmonyType = validHarmonies.includes(harmonyType) ? harmonyType : 'complementary';

    console.log(`Generating ${safeHarmonyType} harmony for color:`, base.toHex());

    let harmonyColors: string[] = [];
    try {
      const harmonyResult = base.harmonies(safeHarmonyType as any);
      harmonyColors = harmonyResult.map((c: any) => c.toHex());
      console.log("Generated harmony colors:", harmonyColors);
    } catch (harmonyError) {
      console.warn("Error generating harmonies, using manual harmonies:", harmonyError);
      
      // Manual fallback harmonies based on HSL
      const hsl = base.toHsl();
      const h = hsl.h;
      
      switch(safeHarmonyType) {
        case 'complementary':
          harmonyColors = [colord({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }).toHex()];
          break;
        case 'analogous':
          harmonyColors = [
            colord({ h: (h + 30) % 360, s: hsl.s, l: hsl.l }).toHex(),
            colord({ h: (h - 30 + 360) % 360, s: hsl.s, l: hsl.l }).toHex()
          ];
          break;
        case 'triadic':
          harmonyColors = [
            colord({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }).toHex(),
            colord({ h: (h + 240) % 360, s: hsl.s, l: hsl.l }).toHex()
          ];
          break;
        case 'split-complementary':
          harmonyColors = [
            colord({ h: (h + 150) % 360, s: hsl.s, l: hsl.l }).toHex(),
            colord({ h: (h + 210) % 360, s: hsl.s, l: hsl.l }).toHex()
          ];
          break;
        default:
          harmonyColors = [colord({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }).toHex()];
      }
    }

    // Create palette with tints and shades
    let palette: string[] = [];
    try {
      palette = [
        base.toHex(), // Main color
        ...harmonyColors, // Harmony colors
        base.lighten(0.2).toHex(), // Light tint (20% lighter)
        base.darken(0.2).toHex(), // Dark shade (20% darker)
      ].slice(0, 5); // Limit to 5 colors

      // Remove duplicates while preserving order
      const uniquePalette = [];
      const seen = new Set();
      for (const color of palette) {
        if (!seen.has(color)) {
          seen.add(color);
          uniquePalette.push(color);
        }
      }
      palette = uniquePalette;
      
      // If we ended up with less than 3 colors, add some tints/shades
      if (palette.length < 3) {
        palette.push(
          base.lighten(0.4).toHex(), // 40% lighter
          base.darken(0.4).toHex()   // 40% darker
        );
      }
      
      console.log("Final unique palette:", palette);
    } catch (paletteError) {
      console.error("Error creating palette, using fallback:", paletteError);
      palette = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
    }

    // ================================================================
    // 6. AI Step 2: Image Generation
    // ================================================================
    console.log("Generating image with prompt:", aiData.logo_prompt);
    let logoUrl: string;
    
    try {
      const imageBlob = await hf.textToImage({
        model: "black-forest-labs/FLUX.1-schnell",
        inputs: `${aiData.logo_prompt}, vector style, flat design, white background, high quality, no text`,
        parameters: { num_inference_steps: 4, guidance_scale: 7.5 },
      }) as unknown as Blob;

      const arrayBuffer = await imageBlob.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);
      const fileName = `logos/${userId}/${Date.now()}.png`;
      logoUrl = await uploadLogoToStorage(imageBuffer, fileName);
      console.log("Logo uploaded successfully:", logoUrl);
    } catch (imageError) {
      console.error("Image generation failed:", imageError);
      return NextResponse.json(
        { error: "Failed to generate logo image" },
        { status: 500 }
      );
    }

    // 7. Database Step
    console.log("Saving to database...");
    try {
      const newBrand = await prisma.brandIdentity.create({
        data: {
          userId: userId,
          brandName: aiData.brand_name,
          colors: {
            base: base.toHex(), // Use the actual color we're using (could be fallback)
            harmony: safeHarmonyType,
            palette: palette,
          },
          fonts: {
            selected: aiData.font_name,
            category: vibe,
          },
          logoUrl: logoUrl,
        },
      });

      console.log("Brand created successfully:", newBrand.id);

      return NextResponse.json({
        success: true,
        brand: { id: newBrand.id },
      });

    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save brand identity" },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("Generation Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate brand identity", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}