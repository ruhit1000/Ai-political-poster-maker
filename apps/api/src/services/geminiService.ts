import { GoogleGenerativeAI } from '@google/generative-ai';

export interface PosterAIConfig {
  enhancedHeadline: string;
  primaryColor: string;
  secondaryColor: string;
}

export const generatePosterEnhancements = async (
  headline: string,
  occasionType: string
): Promise<PosterAIConfig> => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('Valid GEMINI_API_KEY not found. Returning default config.');
    return {
      enhancedHeadline: headline,
      primaryColor: '#1b5e20',
      secondaryColor: '#4caf50'
    };
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `
    You are an expert Bangladeshi political poster designer.
    The user wants to create a poster for the occasion: "${occasionType}".
    Their requested headline is: "${headline}".

    Please provide a JSON response with the following keys:
    1. "enhancedHeadline": A grammatically perfect, slightly enhanced version of their headline in Bangla (keep it punchy, max 6 words). If their headline is already perfect, just return it.
    2. "primaryColor": A hex color code that fits the mood of this occasion. (e.g. Green for Victory Day, Black for Condolence).
    3. "secondaryColor": A complementary hex color code for gradients/accents.

    Respond ONLY with raw JSON, no markdown formatting or backticks. Example:
    {
      "enhancedHeadline": "মহান বিজয় দিবস",
      "primaryColor": "#1b5e20",
      "secondaryColor": "#4caf50"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Remove markdown backticks if Gemini accidentally adds them
    if (text.startsWith('\`\`\`')) {
      text = text.replace(/^\`\`\`(json)?/, '').replace(/\`\`\`$/, '').trim();
    }

    const config: PosterAIConfig = JSON.parse(text);
    return config;
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Fallback if AI fails
    return {
      enhancedHeadline: headline,
      primaryColor: '#1b5e20', // Default green
      secondaryColor: '#4caf50' 
    };
  }
};
