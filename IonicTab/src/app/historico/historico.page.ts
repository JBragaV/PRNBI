import { Component, OnInit } from '@angular/core';
import { CalculoService } from '../service/calculo.service';
import { calculos } from '../models/calculo.models';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  desce = false
  calculos: calculos[]
  constructor(private calculoService: CalculoService) { }

  ngOnInit() {
    this.listar()
  }


  listar(){
    this.calculoService.getAll().subscribe(
      historico => this.calculos = historico,
      error => console.log(error)
    )
  }

  revela(){
    if(this.desce == false){
      this.desce = true
    }else{
      this.desce = false
    }
  }
}
