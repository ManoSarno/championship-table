import { SoccerRound, Game } from "./types";
import { fetchSoccerResults } from "./fetchData";

export async function rounds(): Promise<void> {
  // Array of SoccerRound objects fetched by API
  const gamesData: SoccerRound[] | undefined = await fetchSoccerResults();
  console.log(gamesData);

  // Current round
  let currentRoundIndex: number = 0;

  // Button elements that control navigation between rounds
  const prevRoundBtn: HTMLButtonElement | null = document.getElementById("prevRound") as HTMLButtonElement;
  const nextRoundBtn: HTMLButtonElement | null = document.getElementById("nextRound") as HTMLButtonElement;

  // Event listener for prev button, renders prev round unless is the first
  prevRoundBtn?.addEventListener("click", () => {
    if (currentRoundIndex > 0) {
      currentRoundIndex--;
      console.log(currentRoundIndex);
    }
  });

  // Event listener for next button, renders next round unless is the last
  nextRoundBtn?.addEventListener("click", () => {
    if (currentRoundIndex < gamesData!.length - 1) {
      currentRoundIndex++;
      console.log(currentRoundIndex);
    }
  });
}
