import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { BrandsRes, specificBrand } from '../../interfaces/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  switchmodal: boolean = false;

  constructor(private httpclient: HttpClient) { }
  getallbrand():Observable<BrandsRes> {
    return this.httpclient.get<BrandsRes>(enviroment.baseURL + "/api/v1/brands");
  }
  getspecificbrand(brandid:string):Observable<specificBrand> {
    return this.httpclient.get<specificBrand>(enviroment.baseURL + "/api/v1/brands/"+brandid);
  }
}
