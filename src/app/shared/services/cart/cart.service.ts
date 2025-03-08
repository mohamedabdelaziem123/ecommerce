import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { addcart } from '../../interfaces/cart';
import { enviroment } from '../../../enviroment/enviroment';
import { GetCart } from '../../interfaces/get-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  NoItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private httpclient: HttpClient) { }
  AddtoCart(id:string):Observable<addcart> {
    return this.httpclient.post<addcart>(enviroment.baseURL + "/api/v1/cart",
      {productId:id}
      ,
      {
         headers:{token:localStorage.getItem("token")||''}
       }
    )
  }
  GetCart():Observable<GetCart> {
    return this.httpclient.get<GetCart>(enviroment.baseURL + "/api/v1/cart",{
      headers:{token:localStorage.getItem("token")||''}
    })
  }
  updateCart(itemid:string,count:string):Observable<GetCart> {
    return this.httpclient.put<GetCart>(enviroment.baseURL +"/api/v1/cart/"+itemid,{count:count} ,{
      headers:{token:localStorage.getItem("token")||''}
    })
  }
  deletecartitem(itemid:string):Observable<GetCart> {
    return this.httpclient.delete<GetCart>(enviroment.baseURL +"/api/v1/cart/"+itemid,{
      headers:{token:localStorage.getItem("token")||''}
    })
  }
  clearcartitem():Observable<{message:string}> {
    return this.httpclient.delete<{message:string}>(enviroment.baseURL +"/api/v1/cart/",{
      headers:{token:localStorage.getItem("token")||''}
    })
  }
}
