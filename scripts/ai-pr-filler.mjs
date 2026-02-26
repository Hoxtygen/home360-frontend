import axios from "axios";
import fs from "fs";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DIFF_PATH = process.argv[2];
const TEMPLATE_PATH = ".github/pull_request_template.md";

async function main() {
  if (!GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set");
    process.exit(1);
  }

  const MAX_DIFF_LENGTH = 30000;
  let diff = fs.readFileSync(DIFF_PATH, "utf8");

  if (diff.length > MAX_DIFF_LENGTH) {
    diff =
      diff.substring(0, MAX_DIFF_LENGTH) +
      "\n\n[DIFF TRUNCATED - TOO LARGE FOR AI ANALYSIS]";
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

  const prompt = `
    You are an expert software engineer. Analyze the following git diff and fill out the provided PR template.

    RULES:
    1. Be concise but descriptive.
    2. Identify the core intent of the changes.
    3. If a section is not applicable, state "N/A".
    4. For "How should this be manually tested?", provide clear steps based on the code changes.
    5. Keep the section headers exactly as they are in the template.
    6. Do NOT include screenshots or Jira links unless you can infer them from the code/commits (usually just put placeholder or N/A).

    TEMPLATE:
    ${template}

    GIT DIFF:
    ${diff}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const generatedText = response.data.candidates[0].content.parts[0].text;
    console.log(generatedText);
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response?.data || error.message
    );
    process.exit(1);
  }
}

main();
