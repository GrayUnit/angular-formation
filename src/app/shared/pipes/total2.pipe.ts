import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total2',
})
export class Total2Pipe implements PipeTransform {
  transform(value: number, coef: number, tva?: number): number {
    if (tva) {
      return value * coef * (1 + tva / 100);
    }
    return value * coef;
  }
}
