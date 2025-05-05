import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
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

  addUser(newUser: User){
    const userRef = doc(this.usersCollection);
    newUser.id = userRef.id;
    setDoc(userRef, newUser);
  }

  updateUser(user:User){
    const userRef = doc(this.firestore, `users/${user.id}`);
    updateDoc(userRef, { ... user});
  }
  
  deleteUser(id:string){
    const userRef = doc(this.firestore, `users/${id}`);
    deleteDoc(userRef);
  }

  //constructor() { }
}
