import { Component, OnInit, Input } from '@angular/core';
import { calculos } from '../models/calculo.models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CalculoService } from '../service/calculo.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
})
export class PesoPage implements OnInit {
  
  calculo: calculos[] = []
  formulario: FormGroup 
  
  ngOnInit() {
    this.formulario = this.formBilder.group({
      autonomiaL: [this.totBord],
      autonomiaK: [this.totBordKg],
      payLoad: [this.combMinp],
      ocupantesDianteiros: [""],
      ocupantesCentrais: [""],
      ocupantesTraseiros: [""],
      bagageiroDianteiro: [""],
      bagageiroTraseiro: [""],
      pad: [this.pad],
      pap: [this.pap],
      cgd: [this.cgd],
      cgp: [this.cgp],
      data: [this.hoje]
    })
    

  }
  
  constructor(private formBilder: FormBuilder,
              private calculoService: CalculoService,
              private alertController: AlertController) { }
   add(){
    const novoCalculo = this.formulario.getRawValue() as calculos
    console.log(novoCalculo)
    this.calculoService.add(novoCalculo).then(clcls =>{
      this.presentAlert()
    })
    /*this.calculoService.add1(novoCalculo).subscribe(() => {
      this.presentAlert(),
      error => this.erroAlert()
    })*/
    setTimeout(()=>location.reload(),3000)
    //Pegar o click do alert para recarregar a página...
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      subHeader: 'Adicionado',
      message: 'Os Dados foram adicionados com sucesso!!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  //Variaveis de erro.

  erroFuel = false // Erro combustível fora do padrão
  erroPeso = false// Habilitador do botão de calcular balanceamento

  cobustivel = false // Erro de excesso de combustível --> Depois do calculo de combustível
  payLoad = false // Erro de aeronave sobre carregada --> Depois do calculo de peso
  pesoMaximoPouso = false// Erro de peso maximo de pouso excedido --> Final da página
  cGd = false// Erro Centro de gravidade fora do limite para decolagem --> Final da Página
  cGp = false// Erro Centro de gravidade fora do limite para pouso ---> Final da página
  ok = false//

  totalAutonomia: number = 0;
  temporal = 0;
 
  //Tabela de combustível
  

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
  @Input() cgd//Centro de gravidade na decolagem, calculado
  @Input() cgp//Centro de gravidade no pouso, calculado
  //pesoMaior = false
  

  //Variaveis para o calculo do combustível
  //Variáveis do minimo requerido em litros e em quilos
  @Input() minReq // Mínimo requerido
  @Input() minReqKg
  //Fim

  //Variaveis do primeiro campo, Combustível para a etapa
  etapa = 0
  etapaMinuto = 0
  etapaKg = 0
  etapaKgMinuto = 0

  horaEtapa(event){
    this.etapa = Number((event.detail.value * 41.16 * 2).toFixed(2))
    this.etapaKg = Number(((this.etapa)*0.72).toFixed(2))
    if(event.detail.value > this.temporal) {
      ++this.totalAutonomia
    } else
      --this.totalAutonomia
    this.temporal = event.detail.value
  }

  minutoEtapa(event){
    this.etapaMinuto = Number((((event.detail.value * 41.16)/60)*2).toFixed(2))
    this.etapaKgMinuto = Number(((this.etapaMinuto)*0.72).toFixed(2))
  }
  //Fim da etapa

  //Variaveis do segundo campo, combustível alternado
  Alternado = 0
  AlternadoMinuto = 0
  alternadoKg = 0
  AlternadoKgMinuto = 0

  horaAlternado(event){
    this.Alternado = Number((event.detail.value * 41.16 * 2))
    this.alternadoKg = Number((this.Alternado)*0.72)
    if(event.detail.value > this.temporal) {
      ++this.totalAutonomia
    } else
      --this.totalAutonomia
    this.temporal = event.detail.value
  }

  minutoAlternado(event){
    this.AlternadoMinuto = Number(((event.detail.value * 41.16)/60)*2)
    this.AlternadoKgMinuto = Number((this.AlternadoMinuto)*0.72)
  }
  //Fim do alternado

  //Variaveis do terceiro campo, combustível de Reserva
  reserva = 0
  reservaMinuto = 0
  reservaKg = 0
  reservaKgMinuto = 0

  horaReserva(event){
    this.reserva = Number((event.detail.value * 41.16 * 2))
    this.reservaKg = Number((this.reserva)*0.72)
    if(event.detail.value > this.temporal) {
      ++this.totalAutonomia
    } else
      --this.totalAutonomia
    this.temporal = event.detail.value
  }

  minutoReserva(event){
    this.reservaMinuto = Number(((event.detail.value * 41.16)/60)*2)
    this.reservaKgMinuto = Number((this.reservaMinuto)*0.72)
  }
  //Fim da Reserva

  //Variáveis do quinto campo, Combustível Adcional
  adicional = 0 
  adicionalMinuto = 0
  adicionalKg = 0
  adicionalKgMinuto = 0
  hAdcional = 0
  mAdcional = 0

  horaAdcional(event){
    this.hAdcional = Number(event.detail.value)
    this.adicional = Number(((event.detail.value * 41.16 * 2)))
    this.adicionalKg = Number(((this.adicional)*0.72))
    if(event.detail.value > this.temporal) {
      ++this.totalAutonomia
    } else
      --this.totalAutonomia
    this.temporal = event.detail.value
  }
  
  minutoAdcional(event){
    this.mAdcional = Number(event.detail.value)
    this.adicionalMinuto = Number((((event.detail.value * 41.16)/60)*2))
    this.adicionalKgMinuto = Number(((this.adicionalMinuto)*0.72))
  }
  //Fim do adcional

  //Calculo de Autonomia, função que soma e diz se a aeronave está dento dos limites do tanque de combustível
  vml(){
    try{
      this.minReq = Number(this.etapa + this.etapaMinuto + this.Alternado + this.AlternadoMinuto + this.reserva + this.reservaMinuto).toFixed(2)
      this.minReqKg = Number(this.etapaKg + this.etapaKgMinuto + this.alternadoKg +this.AlternadoKgMinuto + this.reservaKg + this.reservaKgMinuto).toFixed(2)
      
      this.totBord = Number(this.minReq + this.adicional + this.adicionalMinuto).toFixed(2)
      this.totBordKg = Number(this.minReqKg + this.adicionalKg + this.adicionalKgMinuto).toFixed(2)
 
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
  //Fim da função de combustível

  //Calculo do Peso de decolagem
  conc(pesoMaximoDecolagem: string, pesoVazioBasico: string, pesTripuPax: string){
    this.PesDispTot = (Number(pesoMaximoDecolagem.replace(",", ".")) - Number(pesoVazioBasico.replace(",", "."))).toFixed(2)
    
    let temp = (this.PesDispTot - this.minReqKg) - Number(pesTripuPax.replace(",", "."))
    this.combMinp = temp.toFixed(2)
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
    
    this.cgd = (numDep/this.pad).toFixed(3)
    this.centrogravidade = this.cgd.toString().replace(".", ",")
    //Centro de gravidade no pouso
    
    let numPouso = numDep - (Number(this.combEtap)*2.38)
    
    this.cgp = (numPouso/this.pap).toFixed(3)
    console.log(`O centro de gravidade na: Peso de decolagem é ${this.cgd} e no pouso é ${this.cgp}`)  
    //Iniciar as "analises dos valores. Centro de gravidade e peso"

    if(this.pap > 1814){
      this.pesoMaximoPouso = true
      document.getElementById("pesPouso").style.color = "red"
    }else{
      this.pesoMaximoPouso = false
      document.getElementById("pesPouso").style.color = "black"
    }
    if(Number(this.cgd) > 2.402 || Number(this.cgd) < 2.049){
      this.cGd = true
      this.ok = false
    }else{
        this.cGd = false
        this.ok = true
    }
  }
  dataHoje(){
    let data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth()
    let ano = data.getFullYear()
    let segundos = data.getSeconds()
    return [dia, mes, ano].join("/")
  }
  hoje = this.dataHoje()
}