import { Injectable, inject } from '@angular/core';
import {collection, collectionData, doc, Firestore, setDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
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

  addCompany(newCompany: Company){
      const companyRef = doc(this.companiesCollection);
      newCompany.id = companyRef.id;
      setDoc(companyRef, newCompany);
    }

    updateCompany(company:Company){
      const companyRef = doc(this.firestore, `companies/${company.id}`);
      updateDoc(companyRef, { ... company});
    }
    
    deleteCompany(id:string){
      const companyRef = doc(this.firestore, `companies/${id}`);
      deleteDoc(companyRef);
    }    

}
