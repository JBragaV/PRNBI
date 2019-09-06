import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailComposer } from "@ionic-native/email-composer/ngx";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  corpo: string = ""
  emailUsuario:string = ""
  titulo: string = ""
  formulario: FormGroup
  constructor(private formBilder: FormBuilder,
              private emailComposer: EmailComposer) { }

  ngOnInit() {
    this.formulario = this.formBilder.group({
      email:[this.emailUsuario, [Validators.required, Validators.email]],
      titulo:[this.titulo, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      corpo:[this.corpo, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]]
    })
  }

  enviar(){
    //console.log(this.emailUsuario)
    //console.log(this.corpo)
    let email = {
      to: `jocimarcaiadobraga@gmail.com`,
      cc: this.emailUsuario,
      subject: this.titulo,
      body: this.corpo,
      isHtml: true
    }
    this.emailComposer.open(email);
  }
}
