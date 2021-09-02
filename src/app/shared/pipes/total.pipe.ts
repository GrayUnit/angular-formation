import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(value: any, ttc?: boolean): number {
    if (ttc) {
      return value.totalTTC();
    }
    return value.totalHT();
  }
}
