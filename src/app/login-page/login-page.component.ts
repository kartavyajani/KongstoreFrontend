import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  res: any;

  constructor(private middlewareservice: MiddlewareService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([currentUrl]);
    this.router.navigate(['/api-list']);
  }

   loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    password: new FormControl('', Validators.required)
  });

  validateUserName() {
    if (this.loginForm.get('userName')?.status == "INVALID") {
      this.toastr.error("Invalid UserName ");
    }
  }
  validatePassword() {
    if (this.loginForm.get('password')?.status == "INVALID") {
      this.toastr.error("Invalid Password");
    } 
  }
  login(){
    if (this.loginForm.valid) {

      const userData: FormData = new FormData();
      userData.append('username', this.loginForm.get('userName')?.value);
      userData.append('password', this.loginForm.get('password')?.value);

      
      
      this.middlewareservice.loginUser(userData).subscribe(result => {

        console.log("result------->" + result);

        this.res = result
       console.log("result", this.res);
       
      
        if(this.res.Status == "SUCCESS"){
          this.toastr.success(this.res.Status);
          console.log("last_login_time-------------------->",this.res.last_login_time);
          
          if(this.loginForm.get('password')?.value=="Password0"){
            localStorage.setItem("UserName", this.loginForm.get('userName')?.value)
            this.router.navigate(['/change-password']);
          }
          else{
            localStorage.setItem("AuthToken","loggedIn");
            localStorage.setItem("UserName", this.loginForm.get('userName')?.value)
            localStorage.setItem("Lastlogin", this.res.last_login_time)
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            // this.router.navigate([currentUrl]);
            this.router.navigate(['/api-list']).then(() => {
              window.location.reload();
            });
            // window.location.reload();

         
          }
        
         

        }else{
          this.toastr.error("Invalid username password");
        }
        this.loginForm.reset();

      })
    }
    else {
      this.toastr.error("Please enter correct username password");
    }
  }
  reloadComponent() {
    // let currentUrl = this.router.url;
    // console.log("currentUrl",currentUrl);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([currentUrl]);
    this.router.navigate(['/api-list']);
  }

}
