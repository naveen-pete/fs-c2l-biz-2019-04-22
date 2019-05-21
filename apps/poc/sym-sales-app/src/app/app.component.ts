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

  constructor(private ms: MetadataService) { }

  ngOnInit() {
    this.fields = this.ms.getQuotationMetadata();
  }
}
