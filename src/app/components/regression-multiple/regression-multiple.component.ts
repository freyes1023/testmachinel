import { Component, Input, OnInit } from '@angular/core';

export interface dataMultipleI {
  variableY: number;
  variableX1: number;
  variableX2: number;

  variableX1_X_variableY: number;
  variableX1_X_variableX2: number;
  variableX2_X_variableY: number;
  cuadrado_variableY: number;
  cuadrado_variableX1: number;
  cuadrado_variableX2: number;
}

@Component({
  selector: 'app-regression-multiple',
  templateUrl: './regression-multiple.component.html',
  styleUrls: ['./regression-multiple.component.scss']
})
export class RegressionMultipleComponent implements OnInit {
  @Input() dataFormatted: dataMultipleI[] = []
  CalcColumnY = 0
  CalcColumnX1 = 0
  CalcColumnX2 = 0

  sumatorias = {
    SVariableY: 0,
    SVariableX1: 0,
    SVariableX2: 0,
    SVariableX1_X_variableY: 0,
    SVariableX1_X_variableX2: 0,
    SVariableX2_X_variableY: 0,
    SCuadrado_variableY: 0,
    SCuadrado_variableX1: 0,
    SCuadrado_variableX2: 0,
  }
  promedios = {
    PVariableY: 0,
    PVariableX1: 0,
    PVariableX2: 0,
  }
  Raises = {
    RVariableY_X_VariableX1: 0,
    RVariableY_X_VariableX2: 0,
    RVariableY_X_VariableX1VariableX2 : 0
  }

  Resultados = {
    D:0,
    B1:0,
    B2:0,
    A:0,
    Y:0,
  }
  
  constructor() { }

  ngOnInit(): void {
    this.sumatorias.SVariableY = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variableY, 0)
    this.sumatorias.SVariableX1 = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variableX1, 0)
    this.sumatorias.SVariableX2 = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variableX2, 0)
    this.sumatorias.SVariableX1_X_variableY = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variableX1_X_variableY, 0)

    this.sumatorias.SVariableX2_X_variableY = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variableX2_X_variableY, 0)

    this.sumatorias.SCuadrado_variableY = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.cuadrado_variableY, 0)

    this.sumatorias.SCuadrado_variableX1 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.cuadrado_variableX1, 0);

    this.sumatorias.SCuadrado_variableX2 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.cuadrado_variableX2, 0);

    this.sumatorias.SVariableX1_X_variableX2 = this.dataFormatted
      .reduce((acumulador, actual) => acumulador + actual.variableX1_X_variableX2, 0);


    this.promedios.PVariableX1 = this.sumatorias.SVariableX1 / this.dataFormatted.length
    this.promedios.PVariableX2 = this.sumatorias.SVariableX2 / this.dataFormatted.length
    this.promedios.PVariableY = this.sumatorias.SVariableY / this.dataFormatted.length
   this.setMoreData()
  }

  setMoreData(){
    this.Resultados.D = (this.sumatorias.SCuadrado_variableX1 * this.sumatorias.SCuadrado_variableX2 ) - (this.sumatorias.SVariableX1_X_variableX2 * this.sumatorias.SVariableX1_X_variableX2)

    this.Resultados.B1 = ((this.sumatorias.SCuadrado_variableX2 * this.sumatorias.SVariableX1_X_variableY) - (this.sumatorias.SVariableX1_X_variableX2 * this.sumatorias.SVariableX2_X_variableY))/this.Resultados.D;

    this.Resultados.B2 = ((this.sumatorias.SCuadrado_variableX1 * this.sumatorias.SVariableX2_X_variableY) - (this.sumatorias.SVariableX1_X_variableX2 * this.sumatorias.SVariableX1_X_variableY))/this.Resultados.D;

    this.Resultados.A = (this.promedios.PVariableY - (this.promedios.PVariableX1 * this.Resultados.B1) - (this.Resultados.B2 * this.promedios.PVariableX2));

    this.Raises.RVariableY_X_VariableX1 = this.sumatorias.SVariableX1_X_variableY / ( Math.sqrt(this.sumatorias.SCuadrado_variableX1 * this.sumatorias.SCuadrado_variableY));

    this.Raises.RVariableY_X_VariableX2 = this.sumatorias.SVariableX2_X_variableY / ( Math.sqrt(this.sumatorias.SCuadrado_variableX2 * this.sumatorias.SCuadrado_variableY));

    this.Raises.RVariableY_X_VariableX1VariableX2 = Math.sqrt((this.Resultados.B1 * this.sumatorias.SVariableX1_X_variableY + this.Resultados.B2 * this.sumatorias.SVariableX2_X_variableY)/this.sumatorias.SCuadrado_variableY)
  }

  calculateY(){
    if (this.CalcColumnX1 && this.CalcColumnX2) {
      this.CalcColumnY = 0
      this.CalcColumnY = ((this.CalcColumnX1 * this.Resultados.B1) + (this.CalcColumnX2 * this.Resultados.B2)) + this.Resultados.A
    }
  }

}
