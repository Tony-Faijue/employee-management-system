import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, query, where, docData, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
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
  

  getProjectsByGroupIds (groupIds: string[]): Observable<Project[]>{
    // up to 10 values 
    const q = query(this.projectsCollection, where('groupid', 'in', groupIds));
    return collectionData(q, {idField: 'id'}) as Observable<Project[]>;
  }
  
  addProject(newProject: Project): Promise<void>{
      const projectRef = doc(this.projectsCollection);
      newProject.id = projectRef.id;
      return setDoc(projectRef, newProject);
    }

    updateProject(project:Project): Promise<void>{
      const projectRef = doc(this.firestore, `projects/${project.id}`);
     return updateDoc(projectRef, { ... project});
    }
    
    deleteProject(id:string): Promise<void>{
      const projectRef = doc(this.firestore, `projects/${id}`);
      return deleteDoc(projectRef);
    } 



}
