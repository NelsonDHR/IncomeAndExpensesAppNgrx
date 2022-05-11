import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscriber, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  userSubscription:Subscription;
  userName: string;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription= this.store.select('user').subscribe(({user})=>{
      this.userName=user!.name});
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
