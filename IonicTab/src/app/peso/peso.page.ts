import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
})
export class PesoPage implements OnInit {

  formulario: FormGroup
  
  erroFuel = false //
  erroPeso = false//

  payLoad = false //
  cobustivel = false //
  pesoMaximoPouso = false//
  cGd = false//
  cGp = false//
  ok = false//
  
  arara = true //teste
  
  //Tabela de combustível
  
 
  
  @Input() minReq // Mínimo requerido
  @Input() minReqKg

  @Input() totBord //Combustivel total a bordo
  @Input() totBordKg//Peso Combusível total a bordo
  //Tabela Peso
  @Input() PesDispTot //Peso Disponível Total
  @Input() pesTripuPax //Peso total da tripulação e passageiros
  @Input() combMin //Combustível mínimo
  @Input() combMinp //Payload Máximo
  //Tabela Balanceamento 
  @Input() pad //Peso Atual de decolagem
  @Input() pesComb // Peso do combustível a bordo
  @Input() pesZerComb //Peso Zero Combustível atual
  @Input() combEtap //Combustível queimado na etapa
  @Input() pap //Peso atual de pouso
  @Input() centrogravidade
  //pesoMaior = false
  constructor(private formBiulder: FormBuilder) { }
  
  ngOnInit() {
    this.formulario = this.formBiulder.group({
      
    })
  }

  //Variaveis para o calculo do combustível da Etapa
  etapa = 0
  etapaMinuto = 0
  etapaKg = 0
  etapaKgMinuto = 0

  horaEtapa(event){
    this.etapa = Number((event.detail.value * 41.16 * 2))
    this.etapaKg = Number((this.etapa)*0.72)
  }

  minutoEtapa(event){
    this.etapaMinuto = Number(((event.detail.value * 41.16)/60)*2)
    this.etapaKgMinuto = Number((this.etapaMinuto)*0.72)
  }

  //Variaveis para o calculo do combustível alternado
  Alternado = 0
  AlternadoMinuto = 0
  alternadoKg = 0
  AlternadoKgMinuto = 0

  horaAlternado(event){
    this.Alternado = Number((event.detail.value * 41.16 * 2))
    this.alternadoKg = Number((this.Alternado)*0.72)
    console.log(this.alternadoKg)
  }

  minutoAlternado(event){
    this.AlternadoMinuto = Number(((event.detail.value * 41.16)/60)*2)
    this.AlternadoKgMinuto = Number((this.AlternadoMinuto)*0.72)
  }
  //Variaveis para o calculo do combustível de Reserva
  reserva = 0
  reservaMinuto = 0
  reservaKg = 0
  reservaKgMinuto = 0

  horaReserva(event){
    console.log(event)
    this.reserva = Number((event.detail.value * 41.16 * 2))
    this.reservaKg = Number((this.reserva)*0.72)
  }

  minutoReserva(event){
    this.reservaMinuto = Number(((event.detail.value * 41.16)/60)*2)
    this.reservaKgMinuto = Number((this.reservaMinuto)*0.72)
  }

  adicional = 0 
  adicionalMinuto = 0
  adicionalKg = 0
  adicionalKgMinuto = 0

  horaAdcional(event){
    this.adicional = Number(((event.detail.value * 41.16 * 2)))
    this.adicionalKg = Number(((this.adicional)*0.72))
  }

  minutoAdcional(event){
    this.adicionalMinuto = Number((((event.detail.value * 41.16)/60)*2))
    this.adicionalKgMinuto = Number(((this.adicionalMinuto)*0.72))
  }
  //Calculo de Autonomia
  //Valor = Peso máximo de decolagem, Valor2 = peso vazio básico, valor3 = combustível mínimo valor4 = peso tripulação e passageiros
  vml(){
    try{
      this.minReq = (this.etapa + this.etapaMinuto + this.Alternado + this.AlternadoMinuto + this.reserva + this.reservaMinuto)
      this.minReqKg = (this.etapaKg + this.etapaKgMinuto + this.alternadoKg +this.AlternadoKgMinuto + this.reservaKg + this.reservaKgMinuto)
      
      this.totBord = (this.minReq + this.adicional + this.adicionalMinuto)
      this.totBordKg = this.minReqKg + this.adicionalKg + this.adicionalKgMinuto
 
      if(Number(this.totBord > 370.44)){
        this.erroFuel = true
        this.cobustivel = true
        document.getElementById("totalBordo").style.color = "red"
      }else{
        this.erroFuel = false
        this.cobustivel = false
        document.getElementById("totalBordo").style.color = "black"
      }
    }catch(e){
      alert("Você deixou algum campo em branco!!!")
      console.log(e)
    }
  }

  //Função que converte litros em kg
  converteKg(litros: string){
    let kg = (Number(litros) * 0.72).toFixed(2)
    return kg
  }


  //Calculo do Peso de decolagem
  conc(valor: string, valor2: string, valor3: string, valor4: string){
    let teAcalma = Number(valor.replace(",", ".")) - Number(valor2.replace(",", "."))
    
    this.PesDispTot = teAcalma.toFixed(2)
    
    this.combMinp = (teAcalma - Number(valor3.replace(",", ".")) - Number(valor4.replace(",", "."))).toFixed(2)
    
    if(Number(this.combMinp) < 0 ){
      this.payLoad = true
      this.erroPeso = true
      document.getElementById("payLoad").style.color = "red"
    }else{
      this.payLoad = false
      this.erroPeso = false
      document.getElementById("payLoad").style.color = "black"
    } 
  }
  
  //Calculo de balanceamento
  bal(pbv: string, pd: string, pc: string, pt: string, bd: string, btr: string, etapa: string){
    this.pesZerComb = Number(pbv.replace(",", ".")) + Number(pd.replace(",", ".")) + Number(pc.replace(",", ".")) + Number(pt.replace(",", ".")) 
                    + Number(bd.replace(",", ".")) + Number(btr.replace(",", "."))
    this.pesComb = (this.totBord * 0.72).toFixed(2)

    this.pad = (Number(this.pesZerComb) + Number(this.pesComb)).toFixed(2)
    
    this.combEtap = (Number(etapa) * 0.72).toFixed(2)
    
    this.pap = (this.pad - this.combEtap).toFixed(2)
    
    //iniciar os calculos do centro de gravidade
    
    //Centro de gravidade na decolagem
    
    let numDep = ((Number(pbv.replace(",", "."))*2.252) + (Number(pd.replace(",", "."))*2.172) + (Number(pc.replace(",", "."))*3)
    + (Number(pt.replace(",", "."))*3.955) + (Number(bd.replace(",", "."))*0.572) + (Number(btr.replace(",", "."))*4.539) 
    + (Number(this.pesComb.replace(",", ".")))*2.38)
    
    let cgd = (numDep/this.pad).toFixed(3)
    this.centrogravidade = cgd.toString().replace(".", ",")
    //Centro de gravidade no pouso
    
    let numPouso =((Number(pbv.replace(",", "."))*2.252) + (Number(pd.replace(",", "."))*2.172) + (Number(pc.replace(",", "."))*3)
    + (Number(pt.replace(",", "."))*3.955) + (Number(bd.replace(",", "."))*0.572) + (Number(btr.replace(",", "."))*4.539) 
    + (Number(this.pesComb.replace(",", "."))*2.38) - (Number(this.combEtap)*2.38))
    
    let cgp = (numPouso/this.pap).toFixed(3)
    //console.log(`O centro de gravidade na: Peso de decolagem é ${cgd} e no pouso é ${cgp}`)  
    //Iniciar as "analises dos valores. Centro de gravidade e peso"

    if(this.pap > 1814){
      this.pesoMaximoPouso = true
      document.getElementById("pesPouso").style.color = "red"
    }else{
      this.pesoMaximoPouso = false
      document.getElementById("pesPouso").style.color = "black"
    }
    if(Number(cgd) > 2.402 || Number(cgd) < 2.049){
      this.cGd = true
      this.ok = false
    }else{
        this.cGd = false
        this.ok = true
    }
  }

  //A implementar
  limpa(){
    
  }



}