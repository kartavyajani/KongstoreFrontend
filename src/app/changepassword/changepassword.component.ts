import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  res: any;
  username: any;
  constructor(private middlewareservice: MiddlewareService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('UserName')
    this.loginForm.get('userName')?.setValue(this.username);
  }


  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required)



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
  validateNewPassword() {
    if (this.loginForm.get('newPassword')?.status == "INVALID") {
      this.toastr.error("Please enter new password ");
    }
  }
  validateConfirmPassword() {
    if (this.loginForm.get('confirmNewPassword')?.status == "INVALID") {
      this.toastr.error("Please enter Confirm  password");
    }
  }
  login() {
    console.log("check of password of confirm  ",this.loginForm.get('confirmNewPassword')?.value );
    console.log("check of password of new   ",this.loginForm.get('newPassword')?.value );
     console.log("check of password ",this.loginForm.get('confirmNewPassword')?.value === this.loginForm.get('newPassword')?.value);
    if (this.loginForm.valid) {

      if (this.loginForm.get('confirmNewPassword')?.value === this.loginForm.get('newPassword')?.value) {
       
         

        const userData: FormData = new FormData();
        userData.append('username', this.loginForm.get('userName')?.value);
        userData.append('password', this.loginForm.get('password')?.value);
        userData.append('newPassword', this.loginForm.get('newPassword')?.value);
        this.middlewareservice.changePassword(userData).subscribe(result => {
          console.log("result------->" + result);
          this.res = result

          this.loginForm.reset();
          if (this.res == "SUCCESS") {
            this.toastr.success(this.res);
            localStorage.setItem("AuthToken", "loggedIn");

            localStorage.setItem("Lastlogin", this.res.last_login_time)
            this.router.navigate(['/api-list']).then(() => {
              window.location.reload();
            });


          } else {
            this.toastr.error("Invalid username password");
          }

        })
      } else {
        this.toastr.error("Confirm Password do not match with the New Password ");

      }
    }
    else {
      this.toastr.error("Please enter correct username password");
    }
  }
}
