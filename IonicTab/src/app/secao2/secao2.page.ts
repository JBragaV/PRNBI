import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-secao2',
  templateUrl: './secao2.page.html',
  styleUrls: ['./secao2.page.scss'],
})
export class Secao2Page implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  fecharMdl(){
    this.modalController.dismiss()
  }
}
