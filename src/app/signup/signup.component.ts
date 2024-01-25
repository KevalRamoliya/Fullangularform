import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user: any;

  signupform = new FormGroup({
    email: new FormControl("", [Validators.required, this.valid.emailValidator]),
    password: new FormControl("", Validators.required),
  })

  get email() {
    return this.signupform.get('email')
  }

  ngOnInit(): void {
    this.getuserdata()
  }
  constructor(public userdata: SignupService, private router: Router, private valid: ValidationService) { }

  getuserdata() {
    this.userdata.getdata().subscribe((res) => {
      console.log("Get data", res);
      this.user = res;
    })
  }

  postuserdata(signupform: any) {

    if (this.signupform.valid) {
      if (this.user.find((user: any) => user.email === signupform.email)) {
        console.warn("Email already exists");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This Email already enter!"
        });
        this.signupform.reset();
        return;
      }
      this.userdata.postdata(signupform).subscribe((res) => {
        this.user.push(res);
        console.log("post response", res);
        this.router.navigate(['login']);
      })
    } else {
      console.warn("Please enter data");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid data!"
      });
      this.signupform.reset();
    }
  }

}
