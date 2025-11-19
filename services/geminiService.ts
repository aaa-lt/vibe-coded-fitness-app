import { GoogleGenAI } from "@google/genai";
import { TrainingGoal, FitnessLevel } from "../types";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWorkoutPlan = async (
  goal: TrainingGoal,
  level: FitnessLevel,
  duration: number,
  equipment: string
): Promise<string> => {
  try {
    const prompt = `
      Ты профессиональный фитнес-тренер с 20-летним стажем.
      Пользователь хочет получить план тренировки.
      
      Параметры:
      - Цель: ${goal}
      - Уровень подготовки: ${level}
      - Длительность тренировки: ${duration} минут
      - Доступное оборудование: ${equipment}
      
      Пожалуйста, составь подробный, структурированный план тренировки на русском языке.
      Используй Markdown для форматирования (жирный шрифт для названий упражнений, списки для подходов и повторений).
      Включи разминку, основную часть и заминку.
      Добавь мотивирующую цитату в конце.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Извините, не удалось составить план тренировки. Попробуйте позже.";
  } catch (error) {
    console.error("Error generating workout:", error);
    return "Произошла ошибка при связи с ИИ-тренером. Пожалуйста, проверьте подключение или попробуйте позже.";
  }
};