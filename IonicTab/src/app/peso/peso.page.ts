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
  @Input() etapaKg//Peso do combustível da etapa
  @Input() alternadoKg//Peso do combustível alternado
  @Input() adcionalKg//peso combustível adicional
  @Input() reservaKg//Peso combustível reserva
  @Input() minReq // Mínimo requerido
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

  //Calculo de Autonomia
  //Valor = Peso máximo de decolagem, Valor2 = peso vazio básico, valor3 = combustível mínimo valor4 = peso tripulação e passageiros
  vml(pe: string, pa: string, pr: string, pAdc: string){
    try{
      this.minReq = Number(pe.replace(",", "."))+Number(pa.replace(",", "."))+Number(pr.replace(",", "."))
      this.totBord = this.minReq + Number(pAdc.replace(",", "."))
      //Converte litros em kg para o combustível mínimo
      this.combMin = this.converteKg(this.minReq)
      
      this.etapaKg = this.converteKg(pe)
      this.alternadoKg = this.converteKg(pa)
      this.reservaKg = this.converteKg(pr)
      this.adcionalKg = this.converteKg(pAdc)
      this.totBordKg = this.converteKg(this.totBord)
 
      if(Number(this.totBord > 370)){
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
    
    this.combEtap = (Number(etapa.replace(",", ".")) * 0.72).toFixed(2)
    
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
