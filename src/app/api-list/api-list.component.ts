import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {
  services:any=[];
  insertrecord:any=[]
  serviceNameInitial:any="";
  
  searchText:any
  p: any=1;
  countOfPropertiesByType: any ;
  constructor(private middlewareservice: MiddlewareService,private router: Router) {

   }

  ngOnInit(): void {

    this.getAllServices();
    this.insertSwaggerfile();
    // this.insertSwaggerfile();
    // this.reloadComponent();
  }
  getdetails(id:number){
    // this.router.navigate(['/service',id]);
    this.router.navigate(['/tryitout',id]);
    // this.router.navigate(['/details', id]);
  }
getAllServices(){
  this.middlewareservice.getServices().subscribe(res=>{
    this.services = res;
    this.countOfPropertiesByType=this.services.length
    console.log("services------------->",this.services);
    this.serviceNameInitial=this.services.name;
    this.serviceNameInitial=  this.serviceNameInitial.slice(0,2);
    console.log("serviceNameInitial---->",this.serviceNameInitial);
    


  })
}
insertSwaggerfile(){
  this.middlewareservice.insertSwaggerfile().subscribe(res=>{
    this.insertrecord = res;
 
    console.log("data------------->",this.insertrecord);
  })

}
reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }
}

