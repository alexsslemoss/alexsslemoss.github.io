import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tecnico = '';

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute) { }

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  nome = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  cpf = new FormControl('', [Validators.minLength(14), Validators.maxLength(14), Validators.required]);
  telefone = new FormControl('', [Validators.minLength(13), Validators.maxLength(14), Validators.required]);

  ngOnInit(): void {

    this.id_tecnico = this.route.snapshot.paramMap.get('id')!;

    this.service.findById(this.id_tecnico).subscribe(resposta => {
      this.tecnico = resposta;
    });

  }

  update(): void {
    this.service.update(this.tecnico).subscribe(resposta => {
      this.router.navigate(['tecnicos']);
      this.service.message('Técnico atualizado com sucesso.');
    },
      err => {
        if (err.error.status == 400 && err.error.errors != null) {
          this.service.message(err.error.errors[0].message);
        } else {
          this.service.message(err.error.error);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
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
      return 'O campo TELEFONE deve ter no mínimo 8 e no máximo 11 caracteres';
    }
    return false;
  }

}
