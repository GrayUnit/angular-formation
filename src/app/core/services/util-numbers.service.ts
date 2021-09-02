import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilNumbersService {
  constructor() {}
  public totalHT(value: number, coef: number) {
    return value * coef;
  }
  public totalTTC(value: number, coef: number, tva: number) {
    return value * coef * (1 + tva / 100);
  }
}
