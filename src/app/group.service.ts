import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, query, where, docData, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
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

  getGroupById(id: string): Observable<Group>{
    const groupRef = doc(this.firestore, 'groups', id);
    return docData(groupRef, {idField: 'id'}) as Observable<Group>;
  }

  getGroupsByCompanyId(id: string): Observable<Group[]>{
    const q = query(this.groupsCollection, where("companyid", "==", id));
    return collectionData(q, {idField: 'id'}) as Observable<Group[]>;
  }
      
  addGroup(newGroup: Group): Promise<void>{
      const groupRef = doc(this.groupsCollection);
      newGroup.id = groupRef.id;
      return setDoc(groupRef, newGroup);
    }

    updateGroup(group:Group): Promise<void>{
      const groupRef = doc(this.firestore, `groups/${group.id}`);
     return updateDoc(groupRef, { ... group});
    }
    
    deleteGroup(id:string): Promise<void>{
      const groupRef = doc(this.firestore, `groups/${id}`);
     return deleteDoc(groupRef);
    } 


}
