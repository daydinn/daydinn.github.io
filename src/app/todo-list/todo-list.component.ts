import { Component } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  
  
  showAddTodoForm = false;

// Methode zum Anzeigen des Formulars
showAddForm() {
  this.showAddTodoForm = true;
}

// Methode zum Ausblenden des Formulars
hideAddForm() {
  this.showAddTodoForm = false;
}
  
  colors: string[] = ['blue', 'red', 'green'];
  todos: Todo[] = [

    {
      id: 1,
      label: 'Einkaufen',
      color: 'green',
      isCompleted: false,
      points: 10,
      
    },
    {
      id: 2,
      label: 'Geburtstagsgeschenk kaufen',
      color: 'blue',
      isCompleted: false,
      points: 20,
      
    },
    {
      id: 3,
      label: 'Sport treiben',
      color: 'red',
      isCompleted: false,
      points: 15,
      
    }
  ];
  newTodo: Todo = {
    id: 0,
    label: '',
    color: 'blue', // Standardfarbe
    isCompleted: false,
    points: 0,
    
  };



saveTodo(){

  // Fügen Sie das neue Todo-Objekt zur Liste hinzu
  if(this.newTodo.label ){
   
    
    
    this.todos.push(this.newTodo);
    this.newTodo = {
      label: '',
      id: 0,
      color: 'blue', // Zurücksetzen auf Standardfarbe
      isCompleted: false,
      points: 0,
      
    };
    


  }
  else {
   alert("Please Enter the Fields");
  }
  }


done(id:number){
  this.todos[id].isCompleted = !this.todos[id].isCompleted;
}

//in this function we will remove the selected row from todo
remove(id:number){
  this.todos = this.todos.filter((v,i)=> i !== id);
}

}




  /*
  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({ text: this.newTodo, completed: false });
      this.newTodo = '';
    }
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  */










