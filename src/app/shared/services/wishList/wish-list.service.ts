import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { WishList } from '../../interfaces/wish-list';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private httpclient: HttpClient) { }
  
  addtoWishList(prodId:string):Observable<any> {
    return this.httpclient.post<any>(enviroment.baseURL +"/api/v1/wishlist", {
      productId:prodId
    }, {
      headers: {
        token:localStorage.getItem("token")||''
      },
      
    },)
  }
  removefromWishList(prodId:string):Observable<any> {
    return this.httpclient.delete<any>(enviroment.baseURL +"/api/v1/wishlist/"+prodId, {
      headers: {
        token:localStorage.getItem("token")||''
      },
      
    },)
  }
  getWishList():Observable<WishList> {
    return this.httpclient.get<WishList>(enviroment.baseURL +"/api/v1/wishlist", {
      headers: {
        
        token:localStorage.getItem("token")||''
      }
      
    },)
  }
}
