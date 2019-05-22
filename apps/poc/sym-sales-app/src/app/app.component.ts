import { Component, OnInit } from '@angular/core';

import { MetadataService } from "./services/metadata.service";
import { FieldBase } from './field/field-base';

@Component({
  selector: 'sym-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fields: FieldBase<any>[] = [];
  isLoaded = false;

  constructor(private ms: MetadataService) { }

  ngOnInit() {
     this.ms.getQuotationMetadata().subscribe(
      (fields) => {
        console.log('fields:', fields);
        this.fields = fields;
        this.isLoaded = true;
      },
      (error) => {
        console.log('error:',error);
      }
    );
  }
}
