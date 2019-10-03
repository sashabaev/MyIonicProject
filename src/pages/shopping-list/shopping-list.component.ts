import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Book } from '../../entities/book';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  loaded: boolean = true
  products: Book[];
  sumProducts: number;
  constructor(private _cartService: CartService, private _location: Location) { }

  ngOnInit() {
    this.products = this._cartService.getBooksCart();
    this.sumProducts = this.products.reduce(function (prev, cur) {
      return Number(prev) + Number(cur.price);
    }, 0);
   
  }

  backClicked() {
    this._location.back();
  }
  Pay() {
  }
}
