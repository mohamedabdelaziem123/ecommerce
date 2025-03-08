import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { productDetails, ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  
  getAllProducts(): Observable<ProductRes>{
    return this.httpClient.get<ProductRes>(enviroment.baseURL+"/api/v1/products");
  }
  getAllProducts2(): Observable<ProductRes>{
    return this.httpClient.get<ProductRes>(enviroment.baseURL+"/api/v1/products?page=2");
  }
  getOneProduct(id:string): Observable<productDetails>{
    return this.httpClient.get<productDetails>(enviroment.baseURL+"/api/v1/products/"+id);
  }
}
