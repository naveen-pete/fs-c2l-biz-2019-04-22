import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FieldBase } from "../field/field-base";
import { TextboxField } from "../field/field-textbox";
import { DropdownField } from "../field/field-dropdown";
import { RadioField } from "../field/field-radio";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private apiUrl = 'http://localhost:8090/systemcommon/rest/Metadata/searchMetadata';
  private fields = [
    'QuotationPartyDO.firstname', 
    'QuotationPartyDO.lastname', 
    'QuotationPartyDO.title', 
    'QuotationPartyDO.genderCd', 
    'QuotationDO.quotationDt' 
  ]

  constructor(private http: HttpClient){}

  getQuotationMetadata() {
    // const fields: FieldBase<any>[] = [
    //   new TextboxField({
    //     key: 'name',
    //     label: 'Name',
    //     value: 'Ram',
    //     required: true,
    //     order: 1
    //   }),
    //   new TextboxField({
    //     key: 'email',
    //     label: 'Email',
    //     required: true,
    //     order: 2
    //   }),
    //   new DropdownField({
    //     key: 'city',
    //     label: 'City',
    //     required: true,
    //     value: 'blr',
    //     options: [
    //       { key: 'bom', value: 'Mumbai' },
    //       { key: 'blr', value: 'Bengaluru' },
    //       { key: 'pun', value: 'Pune' }
    //     ],
    //     order: 3
    //   }),
    //   new RadioField({
    //     key: 'gender',
    //     label: 'Gender',
    //     required: true,
    //     value: 'f',
    //     options: [
    //       { label: 'Male', value: 'm' },
    //       { label: 'Female', value: 'f' }
    //     ],
    //     order: 4
    //   })
    // ];

  //  return fields.sort((a, b) => a.order - b.order);
  return this.http.get(this.apiUrl)
    .pipe(
      map((metadata: any) => {
        let fields: FieldBase<any>[] = [];
        this.fields.forEach(field => {
          let uimdFound = metadata.uiMetadata.find(uimd => uimd.metaDataCd === field && uimd.propertyCd === 'LABELKEY');
          let propertyValue = uimdFound ? uimdFound.propertyValue : field;

          let labelFound = metadata.labels.find(label => label.key === propertyValue);
          let labelValue = labelFound ? labelFound.value : propertyValue;

          uimdFound = metadata.uiMetadata.find(uimd => uimd.metaDataCd === field && uimd.propertyCd === 'INPUTTYPECD');
          let controlType = uimdFound ? uimdFound.propertyValue : 'TEXT';

          if(controlType === 'TEXT' || controlType === 'DATE') {
            fields.push(new TextboxField({
              key: propertyValue,
              label: labelValue,
              required: true,
              controlType: 'TEXT',
              type: controlType.toLowerCase()
            }));
          }

          if(controlType === 'COMBO' || controlType === 'RADIO') {
            uimdFound = metadata.uiMetadata.find(uimd => uimd.metaDataCd === field && uimd.propertyCd === 'LOOKUPCD');
            let lookupKey = uimdFound ? uimdFound.propertyValue : '';

            let lookups = metadata.lookupData.filter(lookup => lookup.key === lookupKey);

            let fieldCtrl: FieldBase<any>;
            if(controlType === 'COMBO') {
              fieldCtrl = new DropdownField({
                key: propertyValue,
                label: labelValue,
                required: true,
                controlType: controlType,
                options: lookups.map(lookup => ({ key: lookup.cd, value: lookup.desc }))
              });

              fields.push(fieldCtrl);
            }
            if(controlType === 'RADIO') {
              fieldCtrl = new RadioField({
                key: propertyValue,
                label: labelValue,
                required: true,
                controlType: controlType,
                options: lookups.map(lookup => ({ value: lookup.cd, label: lookup.desc }))
              });

              fields.push(fieldCtrl);
            }

          }
        });

        return fields;
      })
    );
  }
}
