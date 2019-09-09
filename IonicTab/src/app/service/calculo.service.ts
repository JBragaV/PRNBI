import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { calculos } from '../models/calculo.models';
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'

//realizar a conexao com o servidor carregando o driver do banco
const API_URL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type' : 'application/json; charset=utf-8'}
  )
};
const CALCULOS_KEY = "Historico"

@Injectable({
  providedIn: 'root'
})
export class CalculoService {

  constructor(private http: HttpClient, private storage: Storage) { }

  add(calculo: calculos):Promise<any>{
    return this.storage.get(CALCULOS_KEY).then((clcls: calculos[])=>{
      if(clcls){
        clcls.push(calculo)
        return this.storage.set(CALCULOS_KEY, clcls)
      }else{
        return this.storage.set(CALCULOS_KEY, [calculo])
      }
    })
  }
  getAll(){
    return this.storage.get(CALCULOS_KEY)
  }

  //OS AJUSTES PARA O SQLITE(MELHOR)
  delete(id: number): Promise<calculos>{
    return this.storage.get(CALCULOS_KEY).then((clcls: calculos[])=>{
      if(!clcls || clcls.length === 0){
        return null
      }
    let toKeep: calculos[] = []
    for(let c of clcls){
      console.log(c.id)
      console.log(id)
      console.log(c.id !== id)
      if(c.id !== id){
        console.log(`Passei...${c}`)
        toKeep.push(c)
      }
    }
    return this.storage.set(CALCULOS_KEY, toKeep)
    })
  }
  add1(calculo: calculos){
    return this.http.post(`${API_URL}/historico`, calculo, httpOptions)
  }

  getAll1(){
    return this.http.get<calculos[]>(`${API_URL}/historico`, httpOptions)
  }

  delete1(id: string){
    return this.http.delete(`${API_URL}/historico/${id}`, httpOptions)
  }
}
