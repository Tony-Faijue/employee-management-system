import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Project{
  id: string,
  projectname: string,
  projectdesc: string,
  //foreign keys
  groupid: string,
  taskids?: string[]
  }

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private firestore = inject(Firestore);
  private projectsCollection = collection(this.firestore, 'projects');

  getProjects(): Observable<Project[]>{
        return collectionData(this.projectsCollection, ({idField: 'id'})) as Observable<Project[]>
      }
  
  addProject(newProject: Project){
      const projectRef = doc(this.projectsCollection);
      newProject.id = projectRef.id;
      setDoc(projectRef, newProject);
    }

    updateProject(project:Project){
      const projectRef = doc(this.firestore, `projects/${project.id}`);
      updateDoc(projectRef, { ... project});
    }
    
    deleteProject(id:string){
      const projectRef = doc(this.firestore, `projects/${id}`);
      deleteDoc(projectRef);
    } 



}
