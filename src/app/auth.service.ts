import { Injectable, inject } from '@angular/core';
import {Firestore, collection, query, where, getDocs, getDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

private firestore = inject(Firestore);
private usersCollection = collection(this.firestore, 'users');



//Logging in
  authenticate(email: string, password: string): Promise<User> {
    const q = query(this.usersCollection,
      where('email', '==', email),
      where('password', '==', password)
    );

    return getDocs(q).then(snapshot =>{
      if(snapshot.empty){
        return Promise.reject(new Error('Invalid email or password'));
      }
      return snapshot.docs[0].data() as User;
    });
  }

  logout(): Promise<void> {
    return Promise.resolve();
  }
}

