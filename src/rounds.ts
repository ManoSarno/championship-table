import { SoccerRound, Game } from "./types";
import { fetchSoccerResults } from "./fetchData";

export async function rounds(): Promise<void> {
  // Array of SoccerRound objects fetched by API
  const gamesData: SoccerRound[] | undefined = await fetchSoccerResults();

  // Current round
  let currentRoundIndex: number = 0;

  // Elements to modify when round changes
  const gamesList: HTMLElement | null = document.getElementById("gamesList");
  const currentRound: HTMLElement | null = document.getElementById("currentRound");
  
  // Button elements that control navigation between rounds
  const prevRoundBtn: HTMLButtonElement | null = document.getElementById("prevRound") as HTMLButtonElement;
  const nextRoundBtn: HTMLButtonElement | null = document.getElementById("nextRound") as HTMLButtonElement;

  // Function that renders elements with information for the respective round
  function renderRound(roundIndex: number): void {
    if (!gamesList || !currentRound || !prevRoundBtn || !nextRoundBtn) return;

    // Select current round object
    const roundData: SoccerRound = gamesData![roundIndex];
    
    // Modify displayed round number
    currentRound.textContent = `RODADA ${roundData.round}`;

    // Reset elements inside games list
    gamesList.innerHTML = "";

    // Iterate through each game in roundData, create a li element
    // and append it to the games list element
    roundData.games.forEach((game: Game) => {
      const listItem: HTMLLIElement = document.createElement("li");
      listItem.classList.add("game-item");
      
      listItem.innerHTML = `
        <div class="team team-home">
          <img src="${game.team_home_id}.svg" alt="${game.team_home_name}" />
          <p>${game.team_home_name}</p>
        </div>
        <div class="score">${game.team_home_score} x ${game.team_away_score}</div>
        <div class="team team-away">
          <img src="${game.team_away_id}.svg" alt="${game.team_away_name}" />
          <p>${game.team_away_name}</p>
        </div>
      `;

      gamesList.appendChild(listItem);
    });

    // Disable buttons when reaching min/max of rounds
    prevRoundBtn.disabled = roundIndex === 0;
    nextRoundBtn.disabled = roundIndex === gamesData!.length - 1;
  }

  // Event listener for prev button, renders prev round unless is the first
  prevRoundBtn?.addEventListener("click", () => {
    if (currentRoundIndex > 0) {
      currentRoundIndex--;
      renderRound(currentRoundIndex);
    }
  });

  // Event listener for next button, renders next round unless is the last
  nextRoundBtn?.addEventListener("click", () => {
    if (currentRoundIndex < gamesData!.length - 1) {
      currentRoundIndex++;
      renderRound(currentRoundIndex);
    }
  });

  // Initial render
  renderRound(currentRoundIndex);
}
