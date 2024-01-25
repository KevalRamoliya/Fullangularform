import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiurl = "http://localhost:3000/posts"
  constructor(private http: HttpClient) { }


  getdata() {
    return this.http.get(this.apiurl);
  }

  postdata(user: any): Observable<any> {
    return this.http.post(this.apiurl, user);
  }

  deleteData(id: any) {
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  deletealldata(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`);
  }

  editdata(user: any, id: any) {
    const editurl = `${this.apiurl}/${id}`
    return this.http.patch(editurl, user);
  }
}
