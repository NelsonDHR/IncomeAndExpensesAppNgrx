
export class User{

    //desestructuramos el firebaseUser para poder pasarlo a nuestra accion en el authservice

    static fromfirebase({email,uid,name}:any){
        return new User(uid,name,email);
    }

    constructor(public uid:string,public name:string,public email:string){
        
    }
}