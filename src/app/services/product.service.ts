import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../components/salle-tp/salle-tp.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProductsSmall() {
    return this.http
      .get<any>('./products.json')
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }

  getProducts() {
    return this.http
      .get<any>('../../')
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }

  getProductsMixed() {
    return this.http
      .get<any>('assets/demo/data/products-mixed.json')
      .toPromise()
      .then((res: any) => res.data as Product[])
      .then((data: any) => data);
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/demo/data/products-orders-small.json')
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }


}
