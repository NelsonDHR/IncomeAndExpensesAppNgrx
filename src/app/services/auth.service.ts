import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { map, Subscription, tap } from 'rxjs';
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import * as authactions from '../auth/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  
  constructor(public auth:AngularFireAuth, private firestore: AngularFirestore,private store:Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if(fuser){
        //debo de desuscribirme a los cambios del usuario pues si estos cambias me dipara el servicio
        this.userSubscription=this.firestore.doc(`${fuser.uid}/user`).valueChanges().subscribe(firestoreUser => {
          console.log(firestoreUser);
          //Referencio la clase User y uso el metodo estatico fromfirebase que espera un objeto firestoreuser y lo desestructura para crear un usuario de mi clase User
          const user= User.fromfirebase(firestoreUser);
          this.store.dispatch(authactions.setUser({user: user}));
        });
      
        //this.store.dispatch(authactions.setUser({}));
      }else{
          this.userSubscription.unsubscribe();
          this.store.dispatch(authactions.unsetUser());
      }
    })
  }

  createUser(name:string, email:string,password:string){
    //console.log({name,email,password});

   return this.auth.createUserWithEmailAndPassword(email,password).then( fbUser => {
    //! i add this cause i know it's not null or undefined
    const newUser = new User(fbUser.user!.uid,name,email);
    
    //i added the object.assign  cause of eror: data must be an object, but it was: a custom user object
    //By the way, when developing with a language that compiles to JavaScript you cannot use custom Objects. Instead, you have to use pure JavaScript objects to save in the Firestore Database.
     return this.firestore.doc(`${fbUser.user!.uid}/user`).set(Object.assign({},newUser));
   });
  }

  loginUser(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logOut(){
    //this.store.dispatch(authactions.unsetUser());
    return this.auth.signOut();
  }
  
  isAuth(){


    //map alllos me to take the information and return whatever i want
      return this.auth.authState.pipe(map(fbUser => fbUser !=null));

  }

}
