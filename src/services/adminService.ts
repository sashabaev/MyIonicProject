import { Injectable } from '@angular/core';
import { Subject, Observable  } from 'rxjs';
import { Book } from '../entities/book';
import { CartState } from '../entities/cartState';import 
{ environment } from '../environments/environment';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { __await } from 'tslib';
import { CookieService } from 'ngx-cookie-service';
import { ProductState } from '../entities/ProductState';

@Injectable()
export class AdminService {
  public AllProducts: Book[] = [];
  private _cookieService: CookieService;
  private _token: string;
  constructor(private http: HttpClient) {
  }
  
  addBook(book: any) {
    return this.http.post(`${environment.apiUrl}books`,book);
  }

  updateBook(book: any) {
    return this.http.put(`${environment.apiUrl}books` + book.id, book);
  }

  removeBookFromDB(id: number) : Observable<any>{
    return this.http.delete(`${environment.apiUrl}books/`+ id);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(`${environment.apiUrl}books`);  
}
    
}
