import { FieldBase } from './field-base';

export class RadioField extends FieldBase<string> {
  controlType = 'radio';
  options: { label: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
