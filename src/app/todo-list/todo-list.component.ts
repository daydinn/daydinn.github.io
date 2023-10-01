import { Component, OnInit } from "@angular/core";
import { Todo } from "../models/todo";
import { ScoresService } from "../services/scores.service";
import { TODOS } from "./todos.config";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  // Implementiert das OnInit-Interface für den Lebenszyklus-Hook.

  showAddTodoForm = false; // Steuert die Anzeige des To-do-Formulars.
  colors: string[] = ["green", "red", "blue"]; // Farboptionen
  maxTodoPoints = 10; // Maximale Punkte für To-dos
  minTodoPoints = 0; // Minimale Punkte für To-dos

  currentPageTodos: number = 1; // Aktuelle  Seite für die Paginierung der To-dos
  itemsPerPageTodos: number = 5; // To-dos pro Seite

  // Inhiziert das ScoresService und ladet ggf.  die To-dos aus dem lokalen Speicher.
  constructor(private scoresService: ScoresService) {}

  ngOnInit() {
    const savedTodos = localStorage.getItem("todos"); // Ruft die To-dos aus dem lokalen Spichert ab.
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos); // Fügt die To-dos zurück in das Array hinzu.
    } else {
      // Standard-Todos,
      this.todos = [
        {
          id: 1,
          label: "Take a walk",
          color: "green",
          isCompleted: false,
          points: 1,
        },
        {
          id: 2,
          label: "Go to the gym",
          color: "blue",
          isCompleted: false,
          points: 5,
        },
        {
          id: 3,
          label: "Check your Emails",
          color: "red",
          isCompleted: false,
          points: 10,
        },
      ];
    }
  }

  // Speichert die aktuellen To-dos im localStorage.
  saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos)); // Convert todos array into a string and save
  }

  // Zeigt das Formular an.
  showAddForm() {
    this.showAddTodoForm = true;
  }

  // Blendet das Formular aus.
  hideAddForm() {
    this.showAddTodoForm = false;
  }

  // Erste To-dos
  todos: Todo[] = TODOS;
  // Die Struktur eines neuen, leeren To-dos
  newTodo: Todo = {
    id: 0,
    label: "",
    color: "blue", // Standardfarbe
    isCompleted: false,
    points: 0,
  };

  // Speichert ein neues To-do.
  saveTodo() {
    if (this.newTodo.label) {
      this.todos.push(this.newTodo);
      this.newTodo = {
        label: "",
        id: 0,
        color: "blue",
        isCompleted: false,
        points: 0,
      };
      this.saveToLocalStorage(); // Speichert die aktaullisierten To-dos im lokalen Speicher.
    } else {
      alert("Please Enter the Fields");
    }
  }
  // Markiert eine Aufgabe als "erledigt" oder nicht "erledigt".
  done(id: number) {
    // Schaltet den isCompleted-Status und aktuallisiert den Punktestands.
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    if (this.todos[id].isCompleted) {
      //Wenn eine Tod-to als erledigt markiert ist, werden die Punte entsprechend der Farbe hinzugefügt.
      this.scoresService.addScore(this.todos[id].color, this.todos[id].points);
    }
    this.saveToLocalStorage();
  }

  // Entfernt das To-do
  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    this.saveToLocalStorage();
  }
}
