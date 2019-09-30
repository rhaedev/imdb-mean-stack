import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> { 
    return this.http.get(this.url + "/listar").pipe(map (resp => {
      //console.log(resp);
      return resp;
    }));
  }

  deleteUser(id) {
     return this.http.delete(this.url + "/borrar?id=" + id).pipe(map (resp => {
      return resp;
    }));
  }

  getUser(id) {
    return this.http.get(this.url + "/usuario?id=" + id).pipe(map (resp => {
     return resp;
   }));
 }

  createUser(usuario){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    console.log(usuario);
    

    let body = {
      user: usuario
    }

    return this.http.post(this.url + '/crear', body, { headers });
  }

  updateUser (value, id) : Observable<any>{
    let headers = new HttpHeaders();
    const user = {
      user: value
    }
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + '/modificar?id=' + id, user, { headers });
  }

  updateUserPass(value, id): Observable<any> {
    let headers = new HttpHeaders();
    const body = {
        pass: value
    }
    console.log('update User', body)
    headers.append('Content-Type', 'application/json');

    return this.http.put(this.url + '/updatePass?id=' + id, body, { headers }).pipe(map (resp => resp));
    
  }

  login( userForm ) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const body = {
      user: userForm,
    };

    return this.http.post(this.url + '/login', body , { headers }).pipe( map( resp => resp));
  }
}
