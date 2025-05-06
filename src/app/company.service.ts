import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';



export interface Company{
id: string,
companyname: string,
address: string,
phonenum: string
}

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private firestore = inject(Firestore);
  private companiesCollection = collection(this.firestore, 'companies');

  getCompanies(): Observable<Company[]>{
      return collectionData(this.companiesCollection, ({idField: 'id'})) as Observable<Company[]>
    }

    getCompanyById(id: string): Observable<Company> {
      const companyRef = doc(this.firestore, 'companies', id);
      return docData(companyRef, { idField: 'id' }) as Observable<Company>;
    }
  
    // Return a Promise so you can chain .then() on the add operation.
    addCompany(newCompany: Company): Promise<void> {
      const companyRef = doc(this.companiesCollection); // creates a new document reference
      newCompany.id = companyRef.id;
      return setDoc(companyRef, newCompany);
    }
  
    // Return a Promise from updateDoc.
    updateCompany(company: Company): Promise<void> {
      const companyRef = doc(this.firestore, 'companies', company.id);
      return updateDoc(companyRef, { ...company });
    }
  
    // Return a Promise from deleteDoc.
    deleteCompany(id: string): Promise<void> {
      const companyRef = doc(this.firestore, 'companies', id);
      return deleteDoc(companyRef);
    }
}
