
import { Component, Input, OnInit } from '@angular/core';

export interface dataSimpleI {
  variable_time: number;
  variable1: number;
  variable2: number;
  variable1_X_variable2: number;
  cuadrado_variable1: number;
  variable1_menos_proVariable1: number;
  variable2_menos_proVariable2: number;
  cuadrado_variable1_menos_proVariable1: number;
  cuadrado_variable2_menos_proVariable2: number;
  variable1_menos_proVariable1_X_variable2_menos_proVariable2: number;
}

@Component({
  selector: 'app-regression-simple',
  templateUrl: './regression-simple.component.html',
  styleUrls: ['./regression-simple.component.scss']
})
export class RegressionSimpleComponent implements OnInit {

  @Input() dataFormatted: dataSimpleI[] = []
  promedio_1: number = 0
  promedio_2: number = 0

  CalcColumnX : any
  CalcColumnY : any

  a: number = 0;
  b: number = 0;
  r: number = 0;

  sumatoria_variable1: number = 0
  sumatoria_variable2: number = 0
  sumatoria_variable1_X_variable2: number = 0
  sumatoria_cuadrado_variable1: number = 0
  sumatoria_variable1_menos_proVariable1: number = 0
  sumatoria_variable2_menos_proVariable2: number = 0
  sumatoria_cuadrado_variable1_menos_proVariable1: number = 0
  sumatoria_cuadrado_variable2_menos_proVariable2: number = 0
  sumatoria_variable1_menos_proVariable1_X_variable2_menos_proVariable2: number = 0

  constructor() { }

  ngOnInit(): void {
    this.sumatoria_variable1 = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variable1, 0)
    this.sumatoria_variable2 = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variable2, 0)

    this.sumatoria_variable1_X_variable2 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.variable1_X_variable2, 0);

    this.sumatoria_cuadrado_variable1 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.cuadrado_variable1, 0);


    this.promedio_1 = this.sumatoria_variable1 / this.dataFormatted.length
    this.promedio_2 = this.sumatoria_variable2 / this.dataFormatted.length
    this.setMoreData()

  }
  setMoreData() {
    this.dataFormatted.forEach((data) => {
      const variable1_menos_proVariable1 = data.variable1 - this.promedio_1
      const variable2_menos_proVariable2 = data.variable2 - this.promedio_2

      data.variable1_menos_proVariable1 = variable1_menos_proVariable1;
      data.variable2_menos_proVariable2 = variable2_menos_proVariable2

      data.cuadrado_variable1_menos_proVariable1 = variable1_menos_proVariable1 * variable1_menos_proVariable1
      data.cuadrado_variable2_menos_proVariable2 = variable2_menos_proVariable2 * variable2_menos_proVariable2
      data.variable1_menos_proVariable1_X_variable2_menos_proVariable2 = variable1_menos_proVariable1 * variable2_menos_proVariable2
    })

    this.sumatoria_variable1_menos_proVariable1 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.variable1_menos_proVariable1, 0);

    this.sumatoria_variable2_menos_proVariable2 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.variable2_menos_proVariable2, 0);

    this.sumatoria_cuadrado_variable1_menos_proVariable1 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.cuadrado_variable1_menos_proVariable1, 0);

    this.sumatoria_cuadrado_variable2_menos_proVariable2 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.cuadrado_variable2_menos_proVariable2, 0);

    this.sumatoria_variable1_menos_proVariable1_X_variable2_menos_proVariable2 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.variable1_menos_proVariable1_X_variable2_menos_proVariable2, 0);

    this.a = (((this.dataFormatted.length * this.sumatoria_variable1_X_variable2) - (this.sumatoria_variable1 * this.sumatoria_variable2)) / ((this.dataFormatted.length * this.sumatoria_cuadrado_variable1) - (this.sumatoria_variable1 * this.sumatoria_variable1)));

    this.b = (this.sumatoria_variable2 - ((((this.dataFormatted.length * this.sumatoria_variable1_X_variable2) - (this.sumatoria_variable1 * this.sumatoria_variable2)) / ((this.dataFormatted.length * this.sumatoria_cuadrado_variable1) - (this.sumatoria_variable1 * this.sumatoria_variable1))) * this.sumatoria_variable1)) / this.dataFormatted.length

    this.r = this.sumatoria_variable1_menos_proVariable1_X_variable2_menos_proVariable2 / (Math.sqrt(this.sumatoria_cuadrado_variable1_menos_proVariable1) * Math.sqrt(this.sumatoria_cuadrado_variable2_menos_proVariable2));
  }

  calculateYSimple(){
    this.CalcColumnY = this.b + (this.a * this.CalcColumnX)
  }

}
