import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, query, where, docData, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Task{
  id: string,
  taskname: string,
  taskdesc: string,
  status: string,
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
    
    getTasksByProjectIds (projectIds: string[]): Observable<Task[]>{
      //up to 10 values
      const q = query(this.tasksCollection, where ('projectid', 'in', projectIds));
      return collectionData(q, {idField: 'id'}) as Observable<Task[]>;
    }   

  addTask(newTask: Task): Promise<void>{
      const taskRef = doc(this.tasksCollection);
      newTask.id = taskRef.id;
      return setDoc(taskRef, newTask);
    }

    updateTask(task:Task): Promise<void>{
      const taskRef = doc(this.firestore, `tasks/${task.id}`);
      return updateDoc(taskRef, { ... task});
    }
    
    deleteTask(id:string): Promise<void>{
      const taskRef = doc(this.firestore, `tasks/${id}`);
      return deleteDoc(taskRef);
    }        
}
