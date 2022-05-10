import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnDestroy {

  userName:string='';
  userSubscription:Subscription;

  constructor(private auth: AuthService,private router:Router,private store:Store<AppState>) { }

  ngOnInit(): void {
   this.userSubscription= this.store.select('user').subscribe(({user})=>{
    this.userName=user!.name});
  }

  logOut(){
    Swal.fire({
      title:'Logging out',
      didOpen: () =>{Swal.showLoading()}
    });
     
    setTimeout(() => {
      Swal.close();
    }, 1000);

    this.auth.logOut().then(()=> this.router.navigate(['/login']));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
