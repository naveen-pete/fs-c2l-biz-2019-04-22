import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../field/field-base';

@Component({
  selector: 'sym-quotation-form-field',
  templateUrl: './quotation-form-field.component.html',
  styleUrls: ['./quotation-form-field.component.css']
})
export class QuotationFormFieldComponent {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.field.key].valid; }

  getControlId(fieldId, radioValue) { return `${fieldId}_${radioValue}`; }
}
