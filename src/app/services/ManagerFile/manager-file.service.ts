import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerFileService {

 /*  URL_FILE = "https://firebasestorage.googleapis.com/v0/b/testmachinel.appspot.com/o/Files%2Fregresion%20lineal%20simple%20MOD.csv?alt=media&token=5ce2cb87-bf39-4fc9-8100-cbd19250c2b8" */
  // URL_FILE = "https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv"
   URL_FILE = "assets/files/regresion_lineal_simple_MOD.csv"
   URL_FILE_2 = './../../../assets/files/regresion_lineal_simple_MOD.xlsx_in.csv'

  constructor(private httpClient : HttpClient) { }

  getDataFile(){
      return this.httpClient.get(this.URL_FILE_2, {responseType: 'text'});
  }
}
