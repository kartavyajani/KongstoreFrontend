import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  id: number = 0;
  service: any;
  serviceName:any;
  targetUrl:any;
  url:any
  targetURls: any = [];
  route: any;
  data:any = [];
  apiData: string="";
  statusCode: any;
  statusCodeValue: any;
  searchText:any

  constructor(private middlewareservice: MiddlewareService, private router: Router,private rout: ActivatedRoute) { }
  insertrecord:any
  ngOnInit(): void {
    this.id = this.rout.snapshot.params['id'];
    // console.log("this.id ----->",this.id);
   this.insertrecord();
    this.getServiceDetails(this.id);
    this.getRouteByServiceId(this.id);
    this.getTargetUrlByServiceId(this.id);
  }

  urlForm = new FormGroup({
    url: new FormControl( Validators.required),
    method:new FormControl( ),
    requestBody:new FormControl( ),
    response:new FormControl( )
    
  });

  getServiceDetails(id: number) {
    this.middlewareservice.getServiceDetails(id).subscribe(res => {
      this.service = res;
      console.log("service detail----------->", this.service);
      console.log("service name------------>",this.service.name);
      this.serviceName =this.service.name;
      
    })

  }
  insertSwaggerfile(){
    this.middlewareservice.insertSwaggerfile().subscribe(res=>{
      this.insertrecord = res;
   
      console.log("data------------->",this.insertrecord);
    })
  
  }
  getRouteByServiceId(id: number) {
    this.middlewareservice.getRouteByServiceId(id).subscribe(res => {
      this.service = res;
      console.log("Route detail----------->", this.service);
      
    })

  }

  getTargetUrlByServiceId(id: number) {
    this.middlewareservice.getTargetUrlByServiceId(id).subscribe(res => {
      this.targetUrl = res;
      console.log("targetURls detail----------->", this.targetUrl);
      for (let index = 0; index < this.targetUrl.targetUrl.length; index++) {
        const element = this.targetUrl[index];
        console.log("targetURl-------->",this.targetUrl.targetUrl[index].targetURl);
        console.log("method-------->",this.targetUrl.targetUrl[index].method);
        this.urlForm.get('url')?.setValue(this.targetUrl.targetUrl[index].targetURl);
        this.urlForm.get('method')?.setValue(this.targetUrl.targetUrl[index].method);
            }
    
    
    })

  }
  
  tryOut(){

    var payload={
      "payload":this.urlForm.get('requestBody')?.value
    }

    console.log("payload======>",this.urlForm.get('requestBody')?.value);
    
    const urlData: FormData = new FormData();
    
    urlData.append('url', this.urlForm.get('url')?.value);
    urlData.append('method', this.urlForm.get('method')?.value);
    urlData.append('payload', this.urlForm.get('requestBody')?.value);

    this.middlewareservice.callUrl(payload,this.urlForm.get('method')?.value,this.urlForm.get('url')?.value).subscribe(result => {
      
      
      console.log("result------->" + result);
      this.data= result;

      console.log("data------>",this.data.body);
      this.apiData=this.data.body;
      this.urlForm.get('response')?.setValue(this.apiData);
      this.statusCode = this.data.statusCode;
      this.statusCodeValue = this.data.statusCodeValue
    })
  }
  
}
