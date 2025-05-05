import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Task{
  id: string,
  taskname: string,
  taskdesc: string,
  status: string
  //foreign keys
  projectid: string
  }

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore = inject(Firestore);
  private tasksCollection = collection(this.firestore, 'tasks');

   getTasks(): Observable<Task[]>{
         return collectionData(this.tasksCollection, ({idField: 'id'})) as Observable<Task[]>
       } 

  addTask(newTask: Task){
      const taskRef = doc(this.tasksCollection);
      newTask.id = taskRef.id;
      setDoc(taskRef, newTask);
    }

    updateTask(task:Task){
      const taskRef = doc(this.firestore, `tasks/${task.id}`);
      updateDoc(taskRef, { ... task});
    }
    
    deleteTask(id:string){
      const taskRef = doc(this.firestore, `tasks/${id}`);
      deleteDoc(taskRef);
    }        
}
