// QA Controller - handles API requests for QA functionality
import { runAnalysis } from '../analysis';

export async function startAnalysis(url: string) {
  try {
    await runAnalysis(url);
    return { success: true };
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
}
