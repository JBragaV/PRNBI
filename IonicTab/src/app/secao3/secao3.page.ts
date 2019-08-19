import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-secao3',
  templateUrl: './secao3.page.html',
  styleUrls: ['./secao3.page.scss'],
})
export class Secao3Page implements OnInit {

  constructor(private ModalController: ModalController) { }

  ngOnInit() {
  }

  fecharMdl(){
    this.ModalController.dismiss()
  }
}
