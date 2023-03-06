import { dataMultipleI } from './components/regression-multiple/regression-multiple.component';
import { Component, OnInit } from '@angular/core';
import { dataSimpleI } from './components/regression-simple/regression-simple.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  method: 'Simple' | 'Multiple' = 'Simple'

  dataFile: any
  hasFile = false

  column1: any
  column2: any
  column3: any
  cellStart: any


  data: any[] = []
  title = 'TestMachineL';
  dataFormattedSimple: dataSimpleI[] = []
  dataFormattedMultiple: dataMultipleI[] = []


  constructor() {

  }

  ngOnInit(): void {
  }

  setMethod(method:'Simple'|'Multiple'){
    if(method == 'Simple') this.method == 'Simple' ? '':this.method = 'Simple'
    if(method == 'Multiple') this.method == 'Multiple' ? '':this.method = 'Multiple'
      
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.dataFile = event.target.files[0] as File
      if (this.dataFile.type == 'text/csv') {
        this.hasFile = true;
      }
    }
  }

  Generate() {
    const File: File = this.dataFile
    if (File.type == 'text/csv') {
      this.data = []
      this.dataFormattedSimple = []
      this.dataFormattedMultiple = []

      File.text().then((data) => {
        const list = data.split("\n")//.splice(0,1);
        const initialCell = this.cellStart ? this.cellStart - 1 : 0

        list.splice(0, initialCell);
        list.forEach((e: any) => {
          this.data.push(e);
        });

        if (this.method == 'Simple') {
          this.setDataFormattedSimple();
        } else if (this.method == 'Multiple') {
          this.setDataFormattedMultiple()
        }
      })

    }
  }

  setDataFormattedSimple() {
    const column1 = this.column1 ? this.column1 : 1
    const column2 = this.column2 ? this.column2 : 2
    this.dataFormattedSimple = []
    this.data.every((element) => {
      const dataArray = element.split(',')
      let variable_time = parseFloat(dataArray[0])
      let variable1 = parseFloat(dataArray[column1 - 1])
      let variable2 = parseFloat(dataArray[column2 - 1])
      if (variable1 != null && variable1 != undefined && variable2 != null &&  variable2 != undefined ) {
        const object: dataSimpleI = {
          variable_time,
          variable1,
          variable2,
          variable1_X_variable2: variable1 * variable2,
          cuadrado_variable1: variable1 * variable1,
          variable1_menos_proVariable1: 0,
          variable2_menos_proVariable2: 0,
          cuadrado_variable1_menos_proVariable1: 0,
          cuadrado_variable2_menos_proVariable2: 0,
          variable1_menos_proVariable1_X_variable2_menos_proVariable2: 0

        }
        this.dataFormattedSimple.push(object)
      }

      if (column1 > dataArray.length || column2 > dataArray.length) {
        alert('Valores inválidos para columnas')
        return false
      }
      else return true
    })
  }

  setDataFormattedMultiple(){
    const column1 = this.column1 ? this.column1 : 1
    const column2 = this.column2 ? this.column2 : 2
    const column3 = this.column3 ? this.column3 : 3
    this.dataFormattedSimple = []
    this.data.every((element) => {
      const dataArray = element.split(',')
      let variableY = parseFloat(dataArray[column1 - 1])
      let variableX1 = parseFloat(dataArray[column2 - 1])
      let variableX2 = parseFloat(dataArray[column3 - 1])

      if (variableY != null && variableY != undefined && variableX1 != null &&  variableX1 != undefined && variableX2 != null && variableX2 != undefined ) {
        const object: dataMultipleI = {
          variableX1,
          variableX2,
          variableY,
          variableX1_X_variableY: variableX1 * variableY,
          variableX1_X_variableX2: variableX1 * variableX2,
          variableX2_X_variableY: variableX2 * variableY,
          cuadrado_variableY: variableY * variableY,
          cuadrado_variableX1: variableX1 * variableX1,
          cuadrado_variableX2: variableX2 * variableX2
        }
        this.dataFormattedMultiple.push(object)
      }
      if (column1 > dataArray.length || column2 > dataArray.length) {
        alert('Valores inválidos para columnas')
        return false
      }
      else return true
    })
  }

  
}
