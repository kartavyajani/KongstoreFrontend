import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiddlewareService } from './middleware.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KongStore';
  tags: any = [];
  Services: any=[];
  userName:any;
  
  loggedIn:any;
  constructor(private middlewareservice: MiddlewareService,private router: Router,private toastr: ToastrService) {
    this.checkSignin();
   }
  payload: any;


  ngOnInit(): void {
  this.payload={
      "firstName":"Robert",
      "lastName":"Robinson",
      "mobile":"9867198185"
  }

this.middlewareservice.test(this.payload).subscribe(res => {
  console.log("res------>", res);

},
err =>{
  console.log("err------>", err);
})
 this.getTags(); 
//  this.checkSignin();
  }


  
  checkSignin(){
   if( localStorage.getItem('AuthToken') === 'loggedIn')
   {
     this.userName=localStorage.getItem('UserName')
    this.loggedIn=true; 
   }
   else {
     this.loggedIn=false;
   }
  
  
  }
  getTags() {
    this.middlewareservice.getTags().subscribe(res => {
      console.log("res------>", res);
      this.tags = res;
      console.log("res------>", this.tags);
      // console.log("this.tags------>",this.tags[0].tags);
    })
  }
  getServices(id:any){
    // this.router.navigate(['/service',id]);
    this.router.navigate(['/getServices',id]);
    console.log("id from side navbar ", id);

    
    // this.router.navigate(['/details', id]);
  }
  exploreapi(){
    if(localStorage.getItem('AuthToken') == 'loggedIn'){
      this.router.navigate(['/api-list']);
       
    }else{
      this.toastr.error("Please log in ")
    }

  }

  signOut(){
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['']);
 


  }


  // getServicesByTag(tagName: string) {


  //   this.middlewareservice.getServicebytag(tagName).subscribe(response => {
  //     console.log("response------>", response);
  //     this.Services = response;
  //     console.log("res------>", this.Services);
  //     // console.log("this.tags------>",this.tags[0].tags);
  //   })
  // }


  // getServicesByTag(tagName: string) {
  //   console.log(tagName);
  //   this.Services.forEach((ele:any) => {
  //     if(ele.name==tagName){
  //       ele.collapse=!ele.collapse
  //     }
  //   });
  // }
}


function ele(ele: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

