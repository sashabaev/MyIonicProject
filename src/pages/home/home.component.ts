import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../services/cartService';
import { Book } from '../../entities/book';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @Input() products: Book[] = [];
  isShowMore:boolean = false;
  thirdSubscription: Subscription;
  _cookieService: CookieService;
  constructor(private _cartService: CartService, public navCtrl: NavController, public navParams: NavParams, cookieService: CookieService, ) {
    this._cookieService = cookieService}

  ngOnInit() {
    debugger
    const access =  this._cookieService.get("access_token");
    // if(access !== "true"){
    //   this.navParams.get('login')
    //         return;
    // }
    if (this._cartService.AllProducts.length == 0) {
      this._cartService.getAllBooks().subscribe(res => {
        this._cartService.AllProducts = res;
        this.products = this._cartService.AllProducts;
      },
        error => {
          this._cookieService.deleteAll();
          console.log('oops', error)
          //this.router.navigate(['login'])
        });
    }
    this.products = this._cartService.AllProducts;
  }

  AddProduct(_product: Book) {
    _product.added = true;
    this._cartService.addProduct(_product);
  }

  RemoveProduct(_product: Book) {
    _product.added = false;
    this._cartService.removeBook(_product.id);
  }

  showMore(){
    this.isShowMore = !this.isShowMore;
  }

}
