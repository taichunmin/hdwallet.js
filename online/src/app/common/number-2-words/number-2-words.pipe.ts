import { Pipe, PipeTransform } from '@angular/core';
import { convertToWords } from '../../../utils';

@Pipe({
  name: 'number2Words'
})
export class Number2WordsPipe implements PipeTransform {

  transform(value: number): string {
    return convertToWords(value);
  }
}
