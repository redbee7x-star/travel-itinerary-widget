import OpenAI from "openai";

export default async function handler(req, res) {
  const { destination, startDate, endDate, interests } = req.query;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
  Create a detailed ${destination} travel itinerary from ${startDate} to ${endDate}.
  Include daily activities, local restaurant suggestions, and logistical advice.
  Tailor it for someone interested in ${interests}.
  Write in a friendly, engaging tone.
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ itinerary: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
