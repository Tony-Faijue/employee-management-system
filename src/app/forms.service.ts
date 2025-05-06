import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

export interface Form{
  id: string,
  status?: string,
  submittedAt:Date
  //foreign keys
  employeeid: string
  
}

@Injectable({
  providedIn: 'root'
})

export class FormsService {
  private firestore = inject(Firestore);

  //Get forms of the type T from the given collection
  getForms<T>(collectionPath:string):Observable<T[]>{
    const coll = collection(this.firestore, collectionPath);
    return collectionData(coll, {idField: 'id'}) as Observable<T[]>;
  }

  addForm<T>(collectionPath:string, newForm: T & {id?: string}): Promise<void> {
    const coll = collection(this.firestore, collectionPath);
    const formDoc = doc(coll);
    newForm.id =formDoc.id;
    return setDoc(formDoc, newForm);
  }

  updateForm<T>(collectionPath:string, updatedForm: T & {id: string}): Promise<void>{
    const formRef = doc(this.firestore, `${collectionPath}/${updatedForm.id}}`);
    return updateDoc(formRef, {...updatedForm});
  }

  deleteForm(collectionPath:string, id:string): Promise<void>{
    const formRef = doc(this.firestore, `${collectionPath}/${id}`);
    return deleteDoc(formRef);
  }

}
