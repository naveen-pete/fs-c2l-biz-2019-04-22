import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../field/field-base';
import { QuotationControlService } from '../services/quotation-control.service';
import { ActivatedRoute } from '@angular/router';
import { MetadataService } from '../services/metadata.service';
import { QuotationService } from '../services/quotation.service';

@Component({
  selector: 'sym-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.css']
})
export class QuotationFormComponent implements OnInit {
  fields: FieldBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  id: number;
  isMetadataLoaded = false;
  proposer: any;

  constructor(
    private route: ActivatedRoute,
    private ms: MetadataService,
    private qcs: QuotationControlService,
    private qs: QuotationService 
  ) { }

  ngOnInit() {
    this.getMetadata();

    this.route.paramMap.subscribe(map => {
      this.id = +map.get('id');

      if(this.id && !isNaN(this.id)) {
        this.qs.getQuotation(this.id).subscribe((quote: any) => {
          this.getParty(quote);
        });
      }

    });
  }

  private getMetadata() {
    this.ms.getQuotationMetadata().subscribe(
      (fields) => {
        this.fields = fields;
        this.isMetadataLoaded = true;
        if(this.id && !isNaN(this.id)) {
          this.initializeFields();
        }

        this.form = this.qcs.toFormGroup(this.fields);
      },
      (error) => {
        console.log('error:',error);
      }
    );
  }

  initializeFields() {
    Object.keys(this.proposer).forEach(key => {
      const field: any = this.fields.find(f => f.key === key);
      console.log(key, '-', this.proposer[key], field);
      if(field) {
        field.value = field.type === 'date' ? this.proposer[key].split(' ')[0] : this.proposer[key];
      }
    });
  }

  getParty(quote: any) {
    const party = quote.listQuotationPartyDOList.find(p => p.roleCd === 'PROPOSER');
    this.proposer = {
      firstname: party.firstname,
      lastname: party.lastname,
      genderCd: party.genderCd,
      title: party.title,
      quotationDt: quote.quotationDt
    }

    console.log(this.proposer);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    console.log(this.form.value);
    this.qs.createQuotation(this.form.value).subscribe(
      (quote) => {
        console.log('Create quote successful!');
        console.log('Saved quote:', quote);
      },
      (error) => {
        console.log('Create quote failed!');
        console.log('Error:', error);
      }
    );
  }
}
