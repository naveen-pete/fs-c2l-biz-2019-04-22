import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';
import { QuotationFormFieldComponent } from './quotation-form-field/quotation-form-field.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotationFormComponent,
    QuotationFormFieldComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
