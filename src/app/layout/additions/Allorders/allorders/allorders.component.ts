import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../shared/services/orders/orders.service';
import { CartService } from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  constructor(private orderservice: OrdersService,private cartservice: CartService) {
    
  }
  ngOnInit(): void {
  
  // this.Getuserorder();
  }
  // Getuserorder() {
  //   this.cartservice.GetCart().subscribe({
  //     next: res => {
  //       this.orderservice.getuserorder(res.cartId).subscribe({
  //         next: res => {
  //           console.log(res)// no data to display
  //         }
  //       })
  //     }
  //   })
     
  // }
}
