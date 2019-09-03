import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { calculos } from '../models/calculo.models';


//realizar a conexao com o servidor carregando o driver do banco
const API_URL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type' : 'application/json; charset=utf-8'}
  )
};


@Injectable({
  providedIn: 'root'
})
export class CalculoService {

  constructor(private http: HttpClient) { }

  add(calculo: calculos){
    return this.http.post(`${API_URL}/historico`, calculo, httpOptions)
  }

  getAll(){
    return this.http.get<calculos[]>(`${API_URL}/historico`, httpOptions)
  }

  delete(id: string){
    return this.http.delete(`${API_URL}/calculos/${id}`, httpOptions)
  }
}
