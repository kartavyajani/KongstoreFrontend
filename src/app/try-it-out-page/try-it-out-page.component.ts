import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { MiddlewareService } from '../middleware.service';

declare const SwaggerUIBundle: any;
@Component({
  selector: 'app-try-it-out-page',
  templateUrl: './try-it-out-page.component.html',
  styleUrls: ['./try-it-out-page.component.css']
})
export class TryItOutPageComponent implements OnInit {
  id: number = 0;
  response: any = [];
  access_token: any;
  insertrecord: any
  errormessage:string="";
  fileURl = environment.fileURl;
  constructor(private rout: ActivatedRoute, private service: MiddlewareService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.insertSwaggerfile();

    // this.tokenForm.get('grant_type').disable();
    this.tokenForm.get('grant_type')?.setValue("password");
    this.tokenForm.get('provision_key')?.setValue("provisionkey");
    this.id = this.rout.snapshot.params['id'];

    var url = this.fileURl + this.id + ".json"

    const ui = SwaggerUIBundle({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      url: url,
      // url: 'C:\\Users\\3182\\Desktop\\kongstorebackup\\swagger.json',
      docExpansion: 'none',
      operationsSorter: 'alpha',
      requestInterceptor: (req: { headers: { Authorization: string; }; }) => {
        req.headers.Authorization = this.tokenForm.get('access_token')?.value;
        return req;
      },
    });
  }

  tokenForm = new FormGroup({
    client_id: new FormControl('',Validators.required),
    client_secret: new FormControl('',Validators.required),
    authenticated_userid: new FormControl('',Validators.required),
    grant_type: new FormControl(''),
    provision_key: new FormControl(''),
    access_token: new FormControl('')
  });
  insertSwaggerfile() {
    this.service.insertSwaggerfile().subscribe(res => {
      this.insertrecord = res;

      console.log("data------------->", this.insertrecord);
    })

  }
  clientID() {
    if (this.tokenForm.get('client_id')?.status == "INVALID") {
      this.toastr.error("Invalid UserName ");
    }

  }
  clinetSecret() {
    if (this.tokenForm.get('client_secret')?.status == "INVALID") {
      this.toastr.error("Invalid UserName ");
    }

  }
  userId() {
    if (this.tokenForm.get('authenticated_userid')?.status == "INVALID") {
      this.toastr.error("Invalid UserName ");
    }

  }

  generateToken() {
    console.log("this.tokenForm.valid",this.tokenForm.valid)
    if (this.tokenForm.valid) {
      console.log("")
      var tokenpayload = {
        "client_id": this.tokenForm.get('client_id')?.value,
        "client_secret": this.tokenForm.get('client_secret')?.value,
        "authenticated_userid": this.tokenForm.get('authenticated_userid')?.value,
        "grant_type": this.tokenForm.get('grant_type')?.value,
        "provision_key": this.tokenForm.get('provision_key')?.value,

      }


      this.service.generateToken(tokenpayload).subscribe(res => {
        console.log("res-------->", res);
        this.response = res;
        this.access_token = this.response.access_token
        console.log("this.access_token-------->", this.access_token);

        this.tokenForm.get('access_token')?.setValue("Bearer " + this.response.access_token);

      }, error => {
        this.errormessage = error.error.text
        if (this.errormessage.includes("Invalid client authentication")) {
          this.toastr.error("Invalid client authentication")
        } else {
          this.toastr.error("An Unknown error occured")
        }
      })

    }else{
      this.toastr.error("Please fill all the details ")
    }
  }

}