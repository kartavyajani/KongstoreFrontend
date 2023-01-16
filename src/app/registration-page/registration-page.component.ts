import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MiddlewareService } from '../middleware.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  [x: string]: any;
  res: any;
  constructor(private middlewareservice: MiddlewareService, private toastr: ToastrService, private el: ElementRef) { }

  ngOnInit(): void {

  }

  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    userName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    organization: new FormControl('', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)),
    telephone: new FormControl('', Validators.pattern('^[0-9]{10}')),
    country: new FormControl('', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)),
    mobile: new FormControl('', Validators.pattern('^[0-9]{10}')),
    terms: new FormControl(false, Validators.required),

  });

  validateFName() {
    if (this.registrationForm.get('firstName')?.status == "INVALID") {
      this.toastr.error("Invalid First Name");
    }
  }
  validateLName() {
    if (this.registrationForm.get('lastName')?.status == "INVALID") {
      this.toastr.error("Invalid Last Name ");
    }
  }
  validateEmail() {
    if (this.registrationForm.get('email')?.status == "INVALID") {
      this.toastr.error("Invalid email ");
    }
    
  }
  validateUserName() {
    if (this.registrationForm.get('userName')?.status == "INVALID") {
      this.toastr.error("Invalid userName ");
    }
    
  }
  validateOrganization() {
    if (this.registrationForm.get('organization')?.status == "INVALID") {
      this.toastr.error("Invalid organization ");
    }
    
  }
  validatePassword() {
    if (this.registrationForm.get('password')?.status == "INVALID") {
      this.toastr.error("Invalid Password");
    }
    
  }
  validateConfirmPassword() {
    if (this.registrationForm.get('confirmPassword')?.status == "INVALID") {
      this.toastr.error("Invalid Confirm Password");
    }
    
  }

  validateTelephone() {
    if (this.registrationForm.get('telephone')?.status == "INVALID") {
      this.toastr.error("Invalid telephone");
    }

  }
  validateMobile() {
    if (this.registrationForm.get('mobile')?.status == "INVALID") {
      this.toastr.error("Invalid mobile");
    }

  }
  validateTerms() {
    if (this.registrationForm.get('terms')?.status == "INVALID") {
      this.toastr.error("Accept your terms condition");
    }

  }


  validate() {
    //  const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    //  invalidControl.focus();
     if (this.registrationForm.get('firstName')?.status == "INVALID") {
      this.toastr.error("Invalid First Name");
    }
     if (this.registrationForm.get('lastName')?.status == "INVALID") {
      this.toastr.error("Invalid Last Name ");
    }
     if (this.registrationForm.get('email')?.status == "INVALID") {
      this.toastr.error("Invalid email ");
    }
    if (this.registrationForm.get('password')?.status == "INVALID") {
      this.toastr.error("Invalid Password");
    }
    if (this.registrationForm.get('confirmPassword')?.status == "INVALID") {
      this.toastr.error("Invalid Confirm Password");
    }
    if (this.registrationForm.get('telephone')?.status == "INVALID") {
      this.toastr.error("Invalid telephone");
    }
    if (this.registrationForm.get('mobile')?.status == "INVALID") {
      this.toastr.error("Invalid mobile");
    }
    if (this.registrationForm.get('terms')?.status == "INVALID") {
      this.toastr.error("Accept your terms condition");
    }
  }
  register() {


    console.log("firstName------>", this.registrationForm.get('firstName')?.value);
    console.log("status------>", this.registrationForm.get('firstName')?.status);
    console.log("terms------>", this.registrationForm.get('terms')?.value);

    if (this.registrationForm.valid) {

      const userData: FormData = new FormData();

      userData.append('firstName', this.registrationForm.get('firstName')?.value);
      userData.append('lastName', this.registrationForm.get('lastName')?.value);
      userData.append('password', this.registrationForm.get('password')?.value);
      userData.append('confirmPassword', this.registrationForm.get('confirmPassword')?.value);
      userData.append('email', this.registrationForm.get('email')?.value);
      userData.append('organization', this.registrationForm.get('organization')?.value);
      userData.append('telephone', this.registrationForm.get('telephone')?.value);
      userData.append('country', this.registrationForm.get('country')?.value);
      userData.append('mobile', this.registrationForm.get('mobile')?.value);
      userData.append('termsandcondition', this.registrationForm.get('terms')?.value);
      userData.append('username', this.registrationForm.get('userName')?.value);


      this.middlewareservice.registerUser(userData).subscribe(result => {
        console.log("result------->" + result);
        this.res = result
        this.toastr.success(this.res);
        this.registrationForm.reset();

      })
    }
    else {
      this.toastr.error("Please enter all data correctly");
    }
  }

  cancel() {
    this.toastr.success("Data cleared successfully");
    this.registrationForm.reset();
  }



}
