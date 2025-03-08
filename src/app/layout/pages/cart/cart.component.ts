import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/get-cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  dataIncart!:Data
  constructor(private cartservice: CartService) {
    this.getLoggedCart();
}

  getLoggedCart() {
    this.cartservice.GetCart().subscribe({
      next: res => {
        
        this.dataIncart = res.data;
        this.cartservice.NoItems.next(res.numOfCartItems)
        
        
      },
      
    })
  
}
  updatecart(itemid:string,count:number) {
    this.cartservice.updateCart(itemid,count.toString()).subscribe({
      next: res => {
        
        this.dataIncart = res.data;
        this.cartservice.NoItems.next(res.numOfCartItems)
        
      }
    })
  }
  deletecartitem(itemid: string) {
    
    this.cartservice.deletecartitem(itemid).subscribe({
      next: res => {
        
        this.dataIncart = res.data;
        this.cartservice.NoItems.next(res.numOfCartItems)
        
        
      }
    })
  }
  clearcartitem() {
    
    this.cartservice.clearcartitem().subscribe({
      next: res => {
        
        this.dataIncart.products = [];
        this.dataIncart.totalCartPrice = 0;
        this.cartservice.NoItems.next(0)
        
      }
    })
}
}
