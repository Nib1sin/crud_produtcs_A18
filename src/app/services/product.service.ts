import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.apiUrl;
    this.myApiUrl = 'api/products/'
  }

  //Metodo para obtener todos los productos del backend
  getListProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }


}
