import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IncomeExpense } from '../models/income-expense.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(private firestore:AngularFirestore,private authService:AuthService) { }

  createIncomeExpense(IncomeExpense:IncomeExpense){
    //TODO:
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/income-expenses`).collection('items').add({...IncomeExpense});

  }


//retorna la coleccion de ingresos y egresos
  initIncomeExpensesListener(uid:string){
    //We use snapshotChanges to get also the id,  but we require a function to get the data
      return this.firestore.collection(`${uid}/income-expenses/items`).snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => {
            
            //Obtenemos la data del snapshot y la guardamos en una constante de tipo objeto
            //const data:any = doc.payload.doc.data();
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            }
          })
        }))
  }

  deleteIncomeExpense(uidItem:string){
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/income-expenses/items/${uidItem}`).delete();
  }
}


