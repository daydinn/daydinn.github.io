import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { ScoresService } from '../scores.service';
import { TODOS } from '../todos.config';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  // Implementiert das OnInit-Interface für den Lebenszyklus-Hook

  showAddTodoForm = false; // Steuert die Anzeige des Todo-Formulars
  colors: string[] = ['green', 'red', 'blue']; // Farboptionen
  maxTodoPoints = 10; // Maximale Punkte für Todos
  minTodoPoints = 0; // Minimale Punkte für Todos

  currentPageTodos: number = 1; // Aktuelle Seite für die Paginierung von Todos
  itemsPerPageTodos: number = 5; // Todos pro Seite

  // Konstruktor, um ScoresService zu injizieren und ggf. Todos aus dem localStorage zu laden
  constructor(private scoresService: ScoresService) {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  ngOnInit() {
    // Beim Starten der App: Versuchen, Todos aus dem localStorage zu laden
    const savedTodos = localStorage.getItem('todos'); // Retrieve the todos from localStorage
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos); // Parse the stringified todos back into an array
    } else {
      // Standard-Todos, falls nichts im localStorage vorhanden ist
      this.todos = [
        {
          id: 1,
          label: 'Take a walk',
          color: 'green',
          isCompleted: false,
          points: 1,
        },
        {
          id: 2,
          label: 'Go to the gym',
          color: 'blue',
          isCompleted: false,
          points: 5,
        },
        {
          id: 3,
          label: 'Check your Emails',
          color: 'red',
          isCompleted: false,
          points: 10,
        },
      ];
    }
  }

  // Hilfsfunktion zum Speichern der aktuellen Todos im localStorage
  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos)); // Convert todos array into a string and save
  }

  // Methode zum Anzeigen des Formulars
  showAddForm() {
    this.showAddTodoForm = true;
  }

  // Methode zum Ausblenden des Formulars
  hideAddForm() {
    this.showAddTodoForm = false;
  }

  // Erste Todos (werden später im ngOnInit aus dem localStorage geladen)
  todos: Todo[] = TODOS;
  // Struktur eines neuen, leeren Todos
  newTodo: Todo = {
    id: 0,
    label: '',
    color: 'blue', // Standardfarbe
    isCompleted: false,
    points: 0,
  };

  // Methode zum Speichern eines neuen Todos
  saveTodo() {
    if (this.newTodo.label) {
      this.todos.push(this.newTodo);
      this.newTodo = {
        label: '',
        id: 0,
        color: 'blue',
        isCompleted: false,
        points: 0,
      };
      this.saveToLocalStorage(); // Save the updated todos list to localStorage
    } else {
      alert('Please Enter the Fields');
    }
  }
  // Methode zum Markieren eines Todos als erledigt/nicht erledigt
  done(id: number) {
    // Umschalten des isCompleted-Status und Aktualisieren des Punktestands
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    if (this.todos[id].isCompleted) {
      //Wenn das Todo als erledigt markiert ist.
      this.scoresService.addScore(this.todos[id].color, this.todos[id].points);  //Punkte auf der Basis der Farbe hinzufügen.
    }
    this.saveToLocalStorage();
  }

  // Methode zum Entfernen eines Todos
  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    this.saveToLocalStorage(); 
  }
}
