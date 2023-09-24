import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { ScoresService } from '../scores.service';
import { TODOS } from '../todos.config';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit { // <-- Implements OnInit for lifecycle hook
  
  
  showAddTodoForm = false;
  colors: string[] = ['green', 'red', 'blue'];


 
    constructor(private scoresService: ScoresService) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    }
  
  
  
  
  
  
  
  ngOnInit() {
    const savedTodos = localStorage.getItem('todos'); // Retrieve the todos from localStorage
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos); // Parse the stringified todos back into an array
    } else {
      // Default todos if there's nothing in localStorage
      this.todos = [
        { id: 1, label: 'Take a walk', color: 'green', isCompleted: false, points: 1 },
        { id: 2, label: 'Go to the gym', color: 'blue', isCompleted: false, points: 5 },
        { id: 3, label: 'Check your Emails', color: 'red', isCompleted: false, points: 10 }
      ];
    }
  }
 
  // A helper function to save the current state of todos into localStorage.
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
  
  

    // Initialized todos which will later be loaded from localStorage in ngOnInit
  todos: Todo[] = TODOS;
  newTodo: Todo = {
    id: 0,
    label: '',
    color: 'blue', // Standardfarbe
    isCompleted: false,
    points: 0,
    
  };



saveTodo(){

  
  if(this.newTodo.label ){
   
    
    
    this.todos.push(this.newTodo);
    this.newTodo = {
      label: '',
      id: 0,
      color: 'blue', 
      isCompleted: false,
      points: 0,
      
    };
    this.saveToLocalStorage();  // Save the updated todos list to localStorage


  }
  else {
   alert("Please Enter the Fields");
  }
  }


  done(id: number) {
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    if (this.todos[id].isCompleted) {  // If the Todo is marked as completed.
      this.scoresService.addScore(this.todos[id].color, this.todos[id].points);  // Add points based on the color.
    }
    this.saveToLocalStorage();
  }

//in this function we will remove the selected row from todo
remove(id:number){
  this.todos = this.todos.filter((v,i)=> i !== id);
  this.saveToLocalStorage();  // Save the updated todos list to localStorage
}

}














