import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { CategoryRes } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getAllCategory(): Observable<CategoryRes>
  {
    return this.httpClient.get<CategoryRes>(enviroment.baseURL+"/api/v1/categories")
  }
}
