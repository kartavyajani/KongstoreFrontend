import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-servicesbytag',
  templateUrl: './servicesbytag.component.html',
  styleUrls: ['./servicesbytag.component.css']
})
export class ServicesbytagComponent implements OnInit {
  Services:any=[];

  tag:any;
  id:any
  searchText:any
  p:any=1
  constructor(private middlewareservice: MiddlewareService,private router: Router,private rout: ActivatedRoute) { }

  ngOnInit(): void {
  
    
    this.id = this.rout.snapshot.params['id'];
    if(this.id == "other"){
      this.tag = '';
    }else{
      this.tag = this.id;
    }

    console.log("comnponent intialiazatioln ------>",this.id);
   
    console.log("before");
   this.getServicesByTag( this.tag);
   console.log("after");
  // this.sidenav.opened
  }
  
  getServicesByTag(tagName: string) {

console.log("Tagname--------.",tagName);

    this.middlewareservice.getServicebytag(tagName).subscribe(response => {
      console.log("response------>", response);
      this.Services = response;
      console.log("res------>", this.Services);

      // console.log("this.tags------>",this.tags[0].tags);
    })
  }
  getdetails(id:number){
    // this.router.navigate(['/service',id]);
    this.router.navigate(['/tryitout',id]);
    // this.router.navigate(['/details', id]);
  }


}
