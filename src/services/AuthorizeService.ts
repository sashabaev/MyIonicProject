import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AuthorizeService {

  constructor(private http: Http) {

  }

  private getRevocationOptions(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', "application/json; charset=utf-8");
    //headers.append('Authorization', `Basic ${token}`);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  private getAuthOptions(token: string): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', "application/json; charset=utf-8");
    headers.append('Authorization', `Bearer ${token}`);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  getAccessToken(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("client_id", "ro.client");
    formData.append("client_secret", "secret");    
    return this.http.post(`${environment.identityServerUrl}connect/token`, formData);
  }

  registerNewAccount(username: string, password: string): Observable<any> {
    let model={
      "email": username,
      "password": password
    };
   const data = JSON.stringify(model);
    return this.http.post(`${environment.identityServerUrl}users`, data, this.getRevocationOptions());
  }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.identityServerUrl}users`);
  }

  logOut(token) {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("token_type_hint", "access_token");
    return this.http.post(`${environment.identityServerUrl}connect/revocation`, formData, this.getRevocationOptions());
  }

  parseJwt(token) {
  try {
    // Get Token Header
    const base64HeaderUrl = token.split('.')[0];
    const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
    const headerData =window.atob(base64Header);

    // Get Token payload and date's
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;

    // TODO: add expiration at check ...


    return dataJWT;
  } catch (err) {
    return false;
  }
}
}
