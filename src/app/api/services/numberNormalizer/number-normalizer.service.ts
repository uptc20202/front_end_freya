import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberNormalizerService {

  constructor() { }

  convertScientificToNormal(num: number): string {
    if(typeof num !== 'number'){
      return '0';
    }
    // Obtenemos la representación en notación científica
    const [coefficient, exponent] = num.toExponential().split('e').map(str => str.trim());

    // Convertimos el coeficiente y el exponente a números
    const coefficientNum = parseFloat(coefficient);
    const exponentNum = parseInt(exponent, 10);

    // Convertimos el coeficiente a BigInt
    const coefficientBigInt = BigInt(coefficientNum * Math.pow(10, exponentNum));

    // Convertimos BigInt a cadena
    const normalNumberStr = coefficientBigInt.toString();

    return normalNumberStr;
}
}
