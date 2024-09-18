import { SoccerRound } from './types';

export async function fetchSoccerResults(): Promise<SoccerRound[] | undefined> {
  try {
      const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: SoccerRound[] = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching soccer results:', error);
  }
}
