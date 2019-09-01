import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FotoFuelPage } from './foto-fuel/foto-fuel.page';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.page.html',
  styleUrls: ['./engine.page.scss'],
})
export class EnginePage implements OnInit {

  dimensoes = ["Comprimento", "Altura", "Envergadura"]
  comprimentos = ["8,70m", "3,00m", "11,85m"]

  constructor(private modalController: ModalController, private popoverController: PopoverController) { 
  }

  ngOnInit() {
  }
  async popOver(){
    const pop = await this.popoverController.create({
      component: FotoFuelPage,
      cssClass: "pop-over-style"
    })
    return pop.present();
  }
  fecharMdl(){
    this.modalController.dismiss()
  }

}
