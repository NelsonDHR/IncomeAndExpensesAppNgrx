import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registerform : FormGroup;

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

    this.registerform = this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password:  ['',[Validators.required,Validators.minLength(8)]]

    });
  }

  createUser(){

if (this.registerform.invalid) {return;}

    Swal.fire({
      title:'wait please',
      didOpen: () =>{Swal.showLoading()}
    });
     
    const {name,email,password} = this.registerform.value;
    this.authService.createUser(name,email,password).then( (credentials) => 
    {console.log(credentials);
     Swal.close();
     this.router.navigate(['/']);
    } ).catch((err) => 
      
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
}));

  }
   
}
