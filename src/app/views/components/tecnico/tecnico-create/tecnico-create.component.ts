import { Tecnico } from './../../../../models/tecnico';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    'telefone': ''
  };

  nome = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  cpf = new FormControl('', [Validators.minLength(14), Validators.maxLength(14), Validators.required]);
  telefone = new FormControl('', [Validators.minLength(13), Validators.maxLength(14), Validators.required]);

  constructor(private router: Router, private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos']);
      this.service.message('Técnico criado com sucesso.');
    },
      err => {
        if (err.error.status == 400 && err.error.errors != null) {
          this.service.message(err.error.errors[0].message);
        } else {
          this.service.message(err.error.error);
        }
      });
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return 'O campo NOME deve ter no mínimo 3 e no máximo 100 caracteres';
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O campo CPF deve ter no mínimo 13 e no máximo 14 caracteres';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O campo TELEFONE deve ter no mínimo 13 e no máximo 14 caracteres';
    }
    return false;
  }

}
