import { Mood } from "./moodInterface";

export const MOODS: Mood[] = [
  { label: "Sad", color: "green",img: "./assets/sadface64.png", isSelected: false, points: 0 },
  { label: "Neutral", color: "green",img: "./assets/neutralface64.png", isSelected: false, points: 0 },
  { label: "Happy", color: "green", img: "./assets/happyface.svg", isSelected: false, points: 0 },
  { label: "Tired", color: "red", img: "./assets/tiredman64.png", isSelected: false, points: 0 },
  { label: "Standing", color: "red", img: "./assets/standingman64.png", isSelected: false, points: 0 },
  { label: "Energic", color: "red", img: "./assets/energicman64.png", isSelected: false, points: 0 },
  { label: "Unproductive", color: "blue", img: "./assets/speedometerlow64.png", isSelected: false, points: 0 },
  { label: "Normalproductive", color: "blue", img: "./assets/speedometermed64.png", isSelected: false, points: 0 },
  { label: "Highproductive", color: "blue", img: "./assets/speedometerhigh64.png", isSelected: false, points: 0 }
];
