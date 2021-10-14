import { FormControl, Validators } from '@angular/forms';
import { Cliente } from './../../../../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cliente = '';

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  nome = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  cpf = new FormControl('', [Validators.minLength(14), Validators.maxLength(14), Validators.required]);
  telefone = new FormControl('', [Validators.minLength(13), Validators.maxLength(14), Validators.required]);

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!;
    this.service.findById(this.id_cliente).subscribe(resposta => {
      this.cliente = resposta;
    });

  }

  update(): void {
    this.service.update(this.cliente).subscribe(resposta => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente atualizado com sucesso.');
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
    this.router.navigate(['clientes']);
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