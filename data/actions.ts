"use server";

export async function summarizeAI(data: string) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Falconsai/medical_summarization",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
