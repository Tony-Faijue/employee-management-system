import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, query, where, docData, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';


export interface User{
//user attributes
id: string,
username: string,
firstname: string,
lastname: string,
email: string,
password: string,
address: string,
phonenum: string,
userrole: string,

salary?: number,
position?: string,
//foreign keys
//company, groups and projects can be null
companyid?: string,
groupids?: string[],
projectids?: string[],
taskids?: string[]
}

//sub interface Employee of User
export interface Employee extends User{
salary?: number,
position?: string,

}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);

  // User Services
  private usersCollection = collection(this.firestore, 'users');
  
  getUsers(): Observable<User[]>{
    return collectionData(this.usersCollection, ({idField: 'id'})) as Observable<User[]>
  }

  addUser(newUser: User):Promise<void>{
    const userRef = doc(this.usersCollection);
    newUser.id = userRef.id;
    return setDoc(userRef, newUser);
  }

  updateUser(user:User): Promise<void>{
    const userRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userRef, { ... user});
  }
  
  deleteUser(id:string):Promise<void>{
    const userRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(userRef);
  }

  getUserById(id:string):Observable<User>{
    const userDocRef = doc(this.firestore, 'users', id);
    return docData(userDocRef, {idField: 'id'}) as Observable<User>;
  }

  getUsersByCompanyId(companyid: string): Observable<User[]> {
    const q = query(
      this.usersCollection,
      where('companyid', '==', companyid)
    );
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  getTempIds(){
    return Promise.resolve(['BIwy7OBkUdVpGP5kjmu7','MewqtcCVPfhIfJfjihtx']);
  }
  
}
