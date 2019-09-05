import { Component, OnInit } from '@angular/core';
import { CalculoService } from '../service/calculo.service';
import { calculos } from '../models/calculo.models';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  desce = false
  calculos: calculos[]
  constructor(private calculoService: CalculoService,
              private plt: Platform,
              private alertController: AlertController) { }

  ngOnInit() {
    this.plt.ready().then(()=>{
      this.listar()
    })
  }

  listar(){
    this.calculoService.getAll().then(clcls =>{
      this.calculos = clcls
    })
  }

  deletar(calculo: calculos){
    this.calculoService.delete(calculo.id).then(clcls => {
      this.presentAlert()
      this.listar()
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Os Dados foram apagados com sucesso!!!',
      buttons: ['OK']
    });

    await alert.present();
  }
  listar1(){
    this.calculoService.getAll1().subscribe(
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

  dataHoje(){
    let data = new Date()
    let dia
    if((data.getDay()+1) > 10){
      dia = data.getDay()+1
    }else{
      dia = `0${data.getDay()+1}`
    }
    let mes
    if((data.getMonth()+1) > 10){
      mes = data.getMonth()+1
      console.log(mes)
    }else{
      mes = `0${data.getMonth()+1}`
      console.log(mes)
    }
    let ano = data.getFullYear()
    let segundos = data.getSeconds()
    return [dia, mes, ano].join("/")
  }
  hoje = this.dataHoje()
}
