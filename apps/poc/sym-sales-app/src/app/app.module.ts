import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';
import { QuotationFormFieldComponent } from './quotation-form-field/quotation-form-field.component';

const routes: Routes = [
  { path: '', component: QuotationFormComponent },
  { path: ':id', component: QuotationFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuotationFormComponent,
    QuotationFormFieldComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
