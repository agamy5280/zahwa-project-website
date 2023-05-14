import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  async getProducts() {
    return this.http.get(`${environment.apiUrl}products?limit=100`)
  }
  async getProductByCategory(category:string){
    return this.http.get(`${environment.apiUrl}products/category/`+ category)
  }
  async getProductByID(id:number){
    return this.http.get(`${environment.apiUrl}products/`+ id)
  }
  async getUserReviews() {
    return this.http.get(`${environment.apiUrl}users?limit=3`)
  }
  async getProductByFlowers() {
    return this.http.get(`${environment.apiUrl}products/search?q=ring`)
  }
}
