import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-secao4',
  templateUrl: './secao4.page.html',
  styleUrls: ['./secao4.page.scss'],
})
export class Secao4Page implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  fecharMdl(){
    this.modalController.dismiss()
  }
}
