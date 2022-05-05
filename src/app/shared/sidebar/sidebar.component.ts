import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService,private router:Router) { }

  ngOnInit(): void {
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
}
