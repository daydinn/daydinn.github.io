export interface SelectedMood {
  date: string; // Das Datum, an dem die Stimmung ausgewählt wurde (im Format "YYYY-MM-DD")
  time: string; // Die Uhrzeit, zu der die Stimmung ausgewählt wurde (im Format "HH:MM")
  moodLabel: string; // Das Label der ausgewählten Stimmung
  moodImg: string; // Der Pfad zum Bild der ausgewählten Stimmung
}
