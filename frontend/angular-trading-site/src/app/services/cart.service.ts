import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    let isAlreadyInCart: boolean = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0){
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === cartItem.id){
          isAlreadyInCart = true;
          tempCartItem.quantity++;
        }
      }
    }

    if(!isAlreadyInCart){
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
