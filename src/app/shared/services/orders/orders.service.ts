import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { Checkout, ShippingAddress } from '../../interfaces/checkout';
import { Observable } from 'rxjs';
import { CashDelivery } from '../../interfaces/cash-delivery';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  mycartid!: string;
  constructor(private httpclient: HttpClient,private cartservice: CartService) { }
  
  checkout(cartid:string,address:ShippingAddress):Observable<Checkout> {
    return this.httpclient.post<Checkout>(`${enviroment.baseURL}/api/v1/orders/checkout-session/${cartid}?url=${enviroment.domain}`, {
      shippingAddress: address
    },
      {
        headers:{

          token:localStorage.getItem("token")||""
        }
      }
    
      
    )
  }

cashOnDelivery(cartid:string,address:ShippingAddress):Observable<CashDelivery> {
  return this.httpclient.post<CashDelivery>(`${enviroment.baseURL}/api/v1/orders/${cartid}`, {
    shippingAddress: address
  },
    {
      headers:{

        token:localStorage.getItem("token")||""
      }
    }
  
    
  )
  }
  // getuserorder(cartid:string):Observable<any> {
  //   return this.httpclient.get<any>(`${enviroment.baseURL}/api/v1/orders/user/${cartid}`)
  // }
}
