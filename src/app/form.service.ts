import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
   UserUrl: string = '/api/';

  constructor(private http: HttpClient) { }

   
  addUser(value: any):any{
    this.getAllUsers()
    return this.http.post(this.UserUrl + 'users', value);
  }

  getAllUsers(): any {
    return this.http.get(this.UserUrl + 'users');
  }
    deleteUserById(id: any) {
    return this.http.delete(this.UserUrl + 'users/' + id);
  }
}
