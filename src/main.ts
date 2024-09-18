import './style.css'
import { rounds } from './rounds'
import arrowSVG from './arrow';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>SEVN ESPORTES ⚽</h1>
  </header>
  <main class="container">
    <h2>Confira as rodadas do nosso campeonato fictício!</h2>
    <div class="rounds-component">
      <div class="rounds-nav">
        <button id="prevRound" class="nav-btn" disabled>
          ${arrowSVG}
        </button>
        <div class="rounds-info">
          <h3>Rodadas de Jogos</h3>
          <p id="currentRound">RODADA 1</p>
        </div>
        <button id="nextRound" class="nav-btn">
          ${arrowSVG}
        </button>
      </div>
      <ul id="gamesList"></ul>
    </div>
  </main>
`

rounds();
