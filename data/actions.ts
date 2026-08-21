"use server";

export interface NuggetSummary {
  tldr: string;
  keyPoints: string[];
}

export async function summarizeAI(
  article: string,
  title: string
): Promise<NuggetSummary> {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content:
              'You are a news editor who condenses articles into short, scannable "nuggets". ' +
              'Respond ONLY with valid JSON in this exact shape: {"tldr": string, "keyPoints": string[]}. ' +
              "The tldr should be 1-2 sentences capturing the core story. " +
              "keyPoints should be 3-6 short, punchy bullet points covering the most important facts, numbers, names, and outcomes in the article, ordered by importance. " +
              "Do not include any text outside the JSON object.",
          },
          {
            role: "user",
            content: `Title: ${title}\n\nArticle:\n${article}`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("Groq API error:", errText);
    throw new Error("Failed to summarize article");
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No summary returned from model");
  }

  const parsed: NuggetSummary = JSON.parse(content);
  return parsed;
}