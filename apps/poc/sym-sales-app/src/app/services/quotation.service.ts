import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  private apiUrl = 'http://localhost:8090/systemcommon/rest/Quotation';
  
  constructor(private http: HttpClient){}

   getQuotation(id: number) {
    return this.http.get(`${this.apiUrl}/searchQuotation?id=${id}`);
   }

   createQuotation(quote: any) {
     return this.http.post(`${this.apiUrl}/saveQuotation`, quote);
   }
}


