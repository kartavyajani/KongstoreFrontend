import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  tags: any = [];
  Services: any=[];
  constructor(private middlewareservice: MiddlewareService,private router: Router) { }




  ngOnInit(): void {


 this.getTags();
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
    
    console.log("id from side navbar ", id);
    // if(id!='other'){
    this.router.navigate(['/getServices',id]).then(()=>{
      // 
      window.location.reload();

    });
  
    // else{
    //   this.router.navigate(['/getServices',id]).then(()=>{
    //     // 
    //     window.location.reload();
    //   });
    // }
    
   


    // this.router.navigate(['/details', id]);
  }

  signOut(){
    localStorage.clear();
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



