import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Subcategories } from '../../interfaces/subcategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private httpclient:HttpClient) { }
  getallsubcategories():Observable <Subcategories>{
    return this.httpclient.get<Subcategories>(enviroment.baseURL+ "/api/v1/subcategories");
  }

}
