import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product';
import { AppError } from '../common/app-error';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl)
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
    const headers = new HttpHeaders().set('x-auth-token', this.storageService.getToken());
    return this.httpClient
      .post<Product>(this.apiUrl, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, product: Product) {
    delete product.id;
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
