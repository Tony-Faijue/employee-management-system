import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJ3a2BS7nUqmZXyl1XpnGjnGsd2qF_97s",
  authDomain: "employee-management-8cbc3.firebaseapp.com",
  projectId: "employee-management-8cbc3",
  storageBucket: "employee-management-8cbc3.firebasestorage.app",
  messagingSenderId: "896798786029",
  appId: "1:896798786029:web:e3892e84426d369ea3a7e4",
  measurementId: "G-NX2LSNRWV3"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirestore(() => getFirestore())
]
};
