import { ThisReceiver } from '@angular/compiler';
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
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id)
    }

    if (existingCartItem != undefined){
      !existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals(){
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0){
      this.remove(cartItem)
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(cartItem: CartItem){
    const index = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);

    if (index > -1){
      this.cartItems.splice(index, 1);
      this.computeCartTotals();
    }
  }
}
