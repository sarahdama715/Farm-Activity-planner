import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Create a simple farm plan for a ${body.crop} farm in ${body.city}, ${body.country}. 
      The farm is ${body.acres} acres with ${body.workers} workers.
      The planting date is ${body.plantingDate}. Available resources: ${body.resources}. 
      Give 3 practical farming activities and a short recommendation.`,
    });

    return Response.json({
  success: true,
  plan: response.text,
});
  } catch (error) {
    console.error('Generate plan error:', error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}