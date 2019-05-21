import { Injectable } from '@angular/core';

import { FieldBase } from "../field/field-base";
import { TextboxField } from "../field/field-textbox";
import { DropdownField } from "../field/field-dropdown";
import { RadioField } from "../field/field-radio";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  getQuotationMetadata(): FieldBase<any>[] {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'name',
        label: 'Name',
        value: 'Ram',
        required: true,
        order: 1
      }),
      new TextboxField({
        key: 'email',
        label: 'Email',
        required: true,
        order: 2
      }),
      new DropdownField({
        key: 'city',
        label: 'City',
        required: true,
        value: 'blr',
        options: [
          { key: 'bom', value: 'Mumbai' },
          { key: 'blr', value: 'Bengaluru' },
          { key: 'pun', value: 'Pune' }
        ],
        order: 3
      }),
      new RadioField({
        key: 'gender',
        label: 'Gender',
        required: true,
        value: 'f',
        options: [
          { label: 'Male', value: 'm' },
          { label: 'Female', value: 'f' }
        ],
        order: 4
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

}
