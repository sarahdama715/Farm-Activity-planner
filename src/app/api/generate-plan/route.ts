import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error: 'AI service is not configured.',
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const today = new Date().toISOString().split('T')[0];

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',

      contents: `
You are an agricultural planning assistant.

Create a practical farm activity plan for the farmer below.

FARM DETAILS
- Crop: ${body.crop}
- Farm size: ${body.acres} acres
- Available workers: ${body.workers}
- Country: ${body.country}
- Region: ${body.region}
- City: ${body.city}
- Location: ${body.location}
- Planting date: ${body.plantingDate}
- Resources already available: ${body.resources}
- Today's date: ${today}

IMPORTANT DATE RULES

The planting date represents the date the farmer plans to plant or the date they actually planted.

1. If the planting date is BEFORE today's date:
   - Assume the farmer has already planted.
   - DO NOT tell the farmer to plant again.
   - DO NOT create a new planting activity.
   - Start the plan from the next appropriate farming activities based on the crop and the time that has passed since planting.
   - Clearly state that planting has already been completed.
   - Focus on the activities currently needed and the activities that follow until harvesting.

2. If the planting date is TODAY:
   - Treat planting as today's activity.
   - Assume the farmer has already prepared the land dont ask them to prepare their land again
   - Tell the farmer that planting is scheduled for today, you should have prepared your land already if not then start preparing your land and push planting to a later date suggest the date
   - Include only urgent preparation that should happen before planting if necessary.
   - Then continue with the activities after planting.

3. If the planting date is TOMORROW:
   - Explain that planting is scheduled for tomorrow.
   - Consider what preparation should already have been completed.
   - If important preparation may still be incomplete, tell the farmer what should be done today.
   - Then schedule planting for tomorrow.
   - Continue with the activities after planting.

4. If the planting date is in the FUTURE:
   - Create a preparation period leading up to planting.
   - Explain what the farmer should prepare before planting.
   - Schedule planting on the specified date.
   - Continue with post-planting activities.

The plan must cover the farming cycle from the farmer's CURRENT STAGE through HARVESTING.

Consider appropriate stages such as:
- Land preparation
- Seed or planting-material preparation
- Planting
- Crop establishment and monitoring
- Weeding
- Fertilization or nutrient management
- Irrigation or water management where appropriate
- Pest and disease monitoring
- Crop maintenance
- Harvest preparation
- Harvesting

Do not blindly include every stage. Only include activities that make sense for the crop and the farmer's current stage.

For a past planting date, calculate approximately how long ago planting occurred and use that to determine what activities are likely to be relevant now.

Make the plan practical for the stated farm size and number of workers.

Use the resources the farmer already has when recommending activities. If an important resource appears to be missing, identify it as something the farmer may need.

Consider the farmer's location when making general recommendations, but do not invent specific weather conditions.

STRUCTURE YOUR RESPONSE AS:

## Farm Activity Plan

Briefly summarize the farm and planting status.

## Current Farming Stage

Explain where the farmer is in the farming cycle based on today's date and the planting date.

## Immediate Priorities

Give the activities the farmer should focus on now.

## Activity Schedule

Give a chronological schedule from the current stage through harvesting.

For each activity include:
- Approximate date or date range
- Activity
- What to do
- Suggested workers or resource considerations when useful

## Harvesting

Explain approximately when harvesting should occur and what preparation should be done beforehand. Clearly state that harvest timing depends on the crop variety, maturity, and field conditions.

## Recommendation

Give a short practical recommendation based on the farmer's current stage.

Do not pretend to know exact local weather, soil conditions, crop variety, or pest pressure unless the farmer provided that information.
      `,
    });

    const plan = response.text?.trim();

    if (!plan) {
      return Response.json(
        {
          error: 'The AI did not return a farm plan.',
        },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error('Generate plan error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error';

    if (
  message.includes('429') ||
  message.includes('RESOURCE_EXHAUSTED') ||
  message.includes('503') ||
  message.includes('UNAVAILABLE') ||
  message.includes('high demand')
) {
      return Response.json(
        {
          error:
            'The AI service is temporarily busy. Please wait a moment and try again.',
        },
        { status: 503 }
      );
    }

    return Response.json(
      {
        error:
          'Unable to generate the farm plan right now. Please try again.',
      },
      { status: 500 }
    );
  }
}