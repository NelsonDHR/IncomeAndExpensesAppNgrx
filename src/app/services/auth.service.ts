import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { map, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
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
    return this.auth.signOut();
  }
  
  isAuth(){


    //map alllos me to take the information and return whatever i want
      return this.auth.authState.pipe(map(fbUser => fbUser !=null));

  }

}
