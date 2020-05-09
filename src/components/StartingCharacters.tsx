import {Demons, Minions, Outsiders, Townsfolk} from "../constants/Characters";
import shuffle from "../seedShuffle";

function numberOfTownsfolk(numberOfPlayers: number) {
  if (numberOfPlayers < 7) return 3;
  if (numberOfPlayers < 10) return 5;
  if (numberOfPlayers < 13) return 7;
  return 9
}

function numberOfOutsiders(numberOfPlayers: number) {
  if ([5,7,10,13].includes(numberOfPlayers)) return 0;
  if ([6,8,11,14].includes(numberOfPlayers)) return 1;
  return 2;
}

function numberOfMinions(numberOfPlayers: number) {
  if (numberOfPlayers < 10) return 1;
  if (numberOfPlayers < 13) return 2;
  return 3
}

function numberOfDemons() {
  return 1;
}

function initialCharacters(numberOfPlayers: number, id?: string) {
  if (numberOfPlayers < 5) throw new Error("players must be at least 5")

  let seed = 0;

  // deterministic behavior for tests
  if (id) {
    for (let i = 0; i <= id.length; i++) {
      seed += id.charCodeAt(i);
    }
  } else {
    seed = Date.now()
  }

  let characters: Array<string> = [];

  let minions = shuffle(Minions, seed)
    .slice(0, numberOfMinions(numberOfPlayers));
  characters = characters.concat(minions);
  const baronModifier = minions.includes("Baron") ? 2 : 0;
  characters = characters.concat(shuffle(Townsfolk, seed)
    .slice(0, numberOfTownsfolk(numberOfPlayers) - baronModifier));
  characters = characters.concat(shuffle(Outsiders, seed)
    .slice(0, numberOfOutsiders(numberOfPlayers) + baronModifier));
  characters = characters.concat(shuffle(Demons, seed)
    .slice(0, numberOfDemons()));

  return shuffle(characters, seed)
}

const StartingCharacters = {
  forNumberOfPlayers : (numberOfPlayers: number, seed?: string) => {
    return initialCharacters(numberOfPlayers, seed || undefined)
  }
}

export default StartingCharacters