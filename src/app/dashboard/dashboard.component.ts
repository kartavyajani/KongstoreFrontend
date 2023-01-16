import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private toastr: ToastrService,private router: Router) { }


  ngOnInit(): void {
  }
  exploreapi(){
    if(localStorage.getItem('AuthToken') == 'loggedIn'){
      this.router.navigate(['/api-list']);
       
    }else{
      this.toastr.error("Please log in ")
    }

  }
  signin(){
    if(localStorage.getItem('AuthToken') == 'loggedIn'){
      this.toastr.error("You are already logged in")
       
    }else{
      this.router.navigate(['/login']);
    }
  }
}
