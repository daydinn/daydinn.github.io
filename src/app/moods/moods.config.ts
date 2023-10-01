import { Mood } from "../models/moodInterface";

export const MOODS: Mood[] = [
  {
    label: "Sad",
    color: "green",
    img: "./assets/sadface64.png", //Icon "Sad face" von Reza Ardiansyah, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf [https://www.flaticon.com/free-icon/sad-face_6185979?related_id=6185979&origin=pack]
    isSelected: false,
    points: 0,
  },
  {
    label: "Neutral",
    color: "green",
    img: "./assets/neutralface64.png", //Icon "Frown" von Reza Ardiansyah, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf [https://www.flaticon.com/free-icon/frown_6185955?related_id=6185955&origin=pack]
    isSelected: false,
    points: 0,
  },
  {
    label: "Happy",
    color: "green",
    img: "./assets/happyface.svg", //Icon "Smile emoticon" von Reza Ardiansyah, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf [https://www.flaticon.com/free-icon/smile-emoticon_6185952?related_id=6185952&origin=pack]
    isSelected: false,
    points: 0,
  },
  {
    label: "Tired",
    color: "red",
    img: "./assets/tiredman64.png", // Icon "Exhausted Man" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/exhausted-man_10756
    isSelected: false,
    points: 0,
  },
  {
    label: "Standing", // Icon "Standing Up Man" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/standing-up-man_10522
    color: "red",
    img: "./assets/standingman64.png",
    isSelected: false,
    points: 0,
  },
  {
    label: "Energic", // Icon "Arms Up" von Freepik, Beschreibung: Arms Up, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/arms-up_10943
    color: "red",
    img: "./assets/energicman64.png",
    isSelected: false,
    points: 0,
  },
  {
    label: "Unproductive", // Icon "Speedometer" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/speedometer_3563393
    color: "blue",
    img: "./assets/speedometerlow64.png",
    isSelected: false,
    points: 0,
  },
  {
    label: "Normalproductive", // Icon "Speedometer" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/speedometer_3563394
    color: "blue",
    img: "./assets/speedometermed64.png",
    isSelected: false,
    points: 0,
  },
  {
    label: "Highproductive", // Icon "Speedometer" von Freepik, lizenziert durch Flaticon, Lizenznehmer: user92498310, erhältlich auf https://www.flaticon.com/free-icon/speedometer_
    color: "blue",
    img: "./assets/speedometerhigh64.png",
    isSelected: false,
    points: 0,
  },
];
