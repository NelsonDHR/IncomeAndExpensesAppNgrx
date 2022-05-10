import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as uiactions from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm: FormGroup
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router,private store:Store<AppState>) { 
  }

  ngOnInit(): void {
    

    this.uiSubscription = this.store.select('ui').subscribe( ui => 
      {
        this.loading= ui.isLoading;
        console.log('cargando subs');      
      });

    this.loginForm = this.fb.group({
      email:['',[Validators.required],Validators.email],
      password:['',Validators.required]
    })

  }

  ngOnDestroy(): void {


    this.uiSubscription.unsubscribe();
  }

  loginUser(){
    if (this.loginForm.invalid) {return;};


    this.store.dispatch(uiactions.isLoading());

/*     Swal.fire({
      title:'wait please',
      didOpen: () =>{Swal.showLoading()}
    }); */
     
    const {email,password} = this.loginForm.value;
    this.authService.loginUser(email,password).then( (credentials) => 
    {console.log(credentials);
/*     Swal.close(); */
     this.store.dispatch(uiactions.stopLoading());
     this.router.navigate(['/']);
    }).catch((err) => {
                        this.store.dispatch(uiactions.stopLoading());
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: err.message,
                        });
                      }
    
    );
  }

}
