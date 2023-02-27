import { ManagerFileService } from './services/ManagerFile/manager-file.service';
import { Component, OnInit } from '@angular/core';

interface data {
  
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataFile :any
  hasFile = false

  columnX : any
  columnY : any
  cellStart : any
  CalcColumnX : any
  CalcColumnY : any

  data: any[] = []
  title = 'TestMachineL';
  dataFormatted: data[] = []
  promedio_1: number = 0
  promedio_2: number = 0

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

  constructor(private managerFileService: ManagerFileService) {

  }

  ngOnInit(): void {
    /* this.managerFileService.getDataFile().subscribe((data: any) => {
      
    }); */


  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.dataFile = event.target.files[0] as File
      if (this.dataFile.type == 'text/csv') {
      this.hasFile = true;
    }
  }
}

  Generate(){
   // if (event.target.files.length > 0) {
     // console.log(event.target.files[0].name);
    // console.log(event.target.files[0]);
      const File:File = this.dataFile
      if (File.type == 'text/csv') {
        this.data = []
        this.dataFormatted = []
        File.text().then((data) => {
          const list = data.split("\n")//.splice(0,1);
          const initialCell = this.cellStart ?  this.cellStart - 1 : 0
          const column1 =  this.columnX  ? this.columnX : 1
          const column2 =  this.columnY ? this.columnY : 2
          
          list.splice(0, initialCell);
          list.forEach((e: any) => {
            this.data.push(e);
          });

          this.data.every((element, index) => {
            // Do your thing, then:
            const dataArray = element.split(',')
            let variable_time = parseFloat(dataArray[0])
            let variable1 = parseFloat(dataArray[column1 - 1])
            let variable2 = parseFloat(dataArray[column2 - 1])
            const object: data = {
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
            this.dataFormatted.push(object)
            
            if (column1 > dataArray.length || column2 > dataArray.length) {
              alert('Valores inválidos para columnas')
              return false
            }
            else return true
          })

          /* this.data.forEach((data: string, index) => {
            const dataArray = data.split(',')
            // if (index > 1) {
            let variable_time = parseFloat(dataArray[0])
            let variable1 = parseFloat(dataArray[column1 - 1])
            let variable2 = parseFloat(dataArray[column2 - 1])
            const object: data = {
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
            this.dataFormatted.push(object)
            // }
          }) */
          this.sumatoria_variable1 = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variable1, 0)
          this.sumatoria_variable2 = this.dataFormatted.reduce((acumulador, actual) => acumulador + actual.variable2, 0)

          this.sumatoria_variable1_X_variable2 = this.dataFormatted
            .reduce((acumulador, actual) => acumulador + actual.variable1_X_variable2, 0);

          this.sumatoria_cuadrado_variable1 = this.dataFormatted
            .reduce((acumulador, actual) => acumulador + actual.cuadrado_variable1, 0);


          this.promedio_1 = this.sumatoria_variable1 / this.dataFormatted.length
          this.promedio_2 = this.sumatoria_variable2 / this.dataFormatted.length


          console.log('dataFormatted', this.dataFormatted);
          this.setMoreData();
        })

      //}

    
    }
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

    this.r = this.sumatoria_variable1_menos_proVariable1_X_variable2_menos_proVariable2  / (Math.sqrt(this.sumatoria_cuadrado_variable1_menos_proVariable1) * Math.sqrt(this.sumatoria_cuadrado_variable2_menos_proVariable2))
  }

 
  calculateY(){
    this.CalcColumnY = this.b+(this.a*this.CalcColumnX)
  }
}
