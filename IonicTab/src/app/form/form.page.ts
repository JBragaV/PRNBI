import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfissionalService } from '../service/profissional.service';
import { Router } from '@angular/router';
import { profissional } from '../models/profissional.models';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  proForm: FormGroup
  testeForm: string
  //Variável de teste.
  msgNome = "";
  msgEmail = "";
  msgEndereco = "";
  msgPass = "";
  msgData = "";
  errorNome = false;
  errorEmail = false;
  errorEndereco = false;
  errorPass = false;
  erroData = false;

  constructor(private alertController: AlertController,
              private formBilder: FormBuilder,
              private profissionalService: ProfissionalService,
              private arota: Router) { }

  ngOnInit():void {
    this.proForm =this.formBilder.group({
      nome:["", [Validators.required, Validators.maxLength(35), Validators.minLength(2)]],
      email:["", [Validators.required, Validators.email, Validators.maxLength(40)]],
      endereco:["", [Validators.required, Validators.maxLength(100)]],
      password:["", Validators.compose([
        Validators.minLength(4), 
        Validators.maxLength(20), 
        Validators.required
      ])],
      data:["", Validators.required]
    })
  }

  add(){
    const novoProfissional = this.proForm.getRawValue() as profissional
    console.log(novoProfissional)
    this.profissionalService.AddProf(novoProfissional).subscribe(() =>{
      this.arota.navigateByUrl(""), 
      error =>{
        console.log(error),
        this.proForm.reset()
      }    
    }
    )
  }

  logar(){  
    let {nome, email, endereco, password} = this.proForm.controls;
    if(!this.proForm.valid){
      if(!nome.valid){
        this.errorNome = true;
        this.msgNome = "Insira um nome no campo acima!"
      }else{
        this.msgNome = "";
      }
      if(!email.valid){
        this.errorEmail = true;
        this.msgEmail = "Insira um e-mail válido no campo acima!"
      }else{
        this.msgEmail = ""
      }
      if(!endereco.valid){
        this.errorEndereco = true;
        this.msgEndereco = "Insira um endereço no campo acima!"
      }else{
        this.msgEndereco = "";
      }
      if(!password.valid){
        this.errorPass = true;
        this.msgPass = "Insira uma senha entre 4 e 20 caracteres!"
      }
    }else{
      console.log("cheguei aqui")
      this.add();
    }
  }
  
  pegar(pro: string){
    console.log(pro)
    const profBD = this.profissionalService.getProf()
    console.log(profBD)
  }
}
