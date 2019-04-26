import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product';
import { AppError } from '../common/app-error';

@Injectable()
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  private products: Product[] = [];

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // Adding custom http headers to the http request
    const httpOptions = {
      headers: new HttpHeaders({
        'my-app-auth-token':  'abcd1234'
      })
    };

    return this.httpClient
      .get<Product[]>(this.apiUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(this.apiUrl, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, product: Product) {
    return this.httpClient
      .patch<Product>(`${this.apiUrl}/${id}`, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number) {
    return this.httpClient
      .delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log('ProductsService.handleError:', error);
    return throwError(new AppError(error));
  }
}
