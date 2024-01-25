import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiurl = "http://localhost:3000/user"
  users: any[] = [];

  constructor(private http: HttpClient) { }

  getdata() {
    return this.http.get(this.apiurl);
  }

  postdata(user: any) {
    return this.http.post(this.apiurl, user)
  }



}
