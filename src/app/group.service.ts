import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Group{
  id: string,
  groupname: string,
  groupdesc: string,
  //foreign keys
  companyid: string
  }


@Injectable({
  providedIn: 'root'
})

export class GroupService {
  private firestore = inject(Firestore);
  private groupsCollection = collection(this.firestore, 'groups');

  getGroups(): Observable<Group[]>{
        return collectionData(this.groupsCollection, ({idField: 'id'})) as Observable<Group[]>
      }

  addGroup(newGroup: Group){
      const groupRef = doc(this.groupsCollection);
      newGroup.id = groupRef.id;
      setDoc(groupRef, newGroup);
    }

    updateGroup(group:Group){
      const groupRef = doc(this.firestore, `groups/${group.id}`);
      updateDoc(groupRef, { ... group});
    }
    
    deleteGroup(id:string){
      const groupRef = doc(this.firestore, `groups/${id}`);
      deleteDoc(groupRef);
    } 


}
