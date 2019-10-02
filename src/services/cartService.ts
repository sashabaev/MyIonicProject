import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Book } from '../entities/book';
import { CartState } from '../entities/cartState';
import { environment } from '../environments/environment';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { __await } from 'tslib';
import { CookieService } from 'ngx-cookie-service';
import { ProductState } from '../entities/ProductState';

@Injectable()
export class CartService {
  private cartSubject = new Subject<CartState>();
  public productsSubject = new Subject<ProductState>();
  Products: Book[] = [];
  public AllProducts: Book[] = [];
  public ProductsState = this.productsSubject.asObservable();
  public CartState = this.cartSubject.asObservable();
  private _cookieService: CookieService;
  private _token: string;

  constructor(private http: HttpClient, cookieService: CookieService) { }

  private getAuthOptions(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', "application/json; charset=utf-8");
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  addProduct(_product: any) {
    console.log('in service');
    this.Products.push(_product)
    this.cartSubject.next(<CartState>{ loaded: true, products: this.Products });
  }

  removeBook(id: number) {
    this.Products = this.Products.filter((_item) => _item.id !== id)
    this.cartSubject.next(<CartState>{ loaded: false, products: this.Products });
  }

  getBooksCart(): Book[] {
    return this.Products;
  }

  getAllBooks(): Observable<any> {
    this.productsSubject.next(<ProductState>{ books: this.Products, loaded: true });
    return this.http.get(`${environment.apiUrl}books`);  
}
    
}
