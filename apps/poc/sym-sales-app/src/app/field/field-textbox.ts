import { FieldBase } from './field-base';

export class TextboxField extends FieldBase<string> {
  controlType = 'TEXT';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
