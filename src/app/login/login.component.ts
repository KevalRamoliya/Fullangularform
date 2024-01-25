import { ValidationService } from './../services/validation.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthservicesService } from '../services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: any;


  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required,this.valid.emailValidator]),
    password: new FormControl("", [Validators.required]),
  })
  get email() {
    return this.loginForm.get('email')
  }


  constructor(public userdata: LoginService, private signupServices: SignupService, private route: Router, private valid: ValidationService,private authService: AuthservicesService) { }

  ngOnInit() {
    this.getSignupdata()
  }

  getuserdata() {
    this.userdata.getdata().subscribe((res) => {
      console.log("Get login data", res);
      this.user = res;
    })
  }

  getSignupdata() {
    this.signupServices.getdata().subscribe((res) => {
      console.log("Sign up data", res);
      this.user = res;
    })
  }

  postuserdata(loginForm: any) {
    this.authService.login()
    if (this.loginForm.valid) {
      const match = this.user.some((userdata: any) => {
        return loginForm.email === userdata.email && loginForm.password === userdata.password;
      });

      if (match) {
        console.log("Login successfully");
        Swal.fire(
          'Login successfully',
          'success'
        );

        // Only make the API call if there is a match
        this.userdata.postdata(loginForm).subscribe(
          (res: any) => {
            console.log("Post login data", res);
            this.route.navigate(['crud']);
          }
        );

      } else {
        console.log("Login failed");
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid email or password. Please try again!"
        });
      }
    } else {
      console.warn("Please enter data");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid data!"
      });
      this.loginForm.reset();
    }
  }




}
