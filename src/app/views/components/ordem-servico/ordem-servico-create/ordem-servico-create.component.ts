import { Router } from '@angular/router';
import { OrdemServico } from './../../../../models/orderServico';
import { Cliente } from './../../../../models/cliente';
import { ClienteService } from './../../../../services/cliente.service';
import { Tecnico } from './../../../../models/tecnico';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { OrdermServicoService } from 'src/app/services/orderm-servico.service';

@Component({
  selector: 'app-ordem-servico-create',
  templateUrl: './ordem-servico-create.component.html',
  styleUrls: ['./ordem-servico-create.component.css']
})
export class OrdemServicoCreateComponent implements OnInit {

  ordemServico: OrdemServico = {
    prioridade: '',
    status: '',
    observacao: '',
    cliente: '',
    tecnico: ''
  }

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private ordermServicoService: OrdermServicoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getClientes();
    this.getTecnicos();
  }

  create(): void {
    this.ordermServicoService.create(this.ordemServico).subscribe((resposta => {
      this.router.navigate(['ordem-servicos'])
      this.ordermServicoService.message('Ordem de Serviço criada com sucesso.')
    }),
      err => {
        if (err.error.status == 400 && err.error.errors != null) {
          this.ordermServicoService.message(err.error.errors[0].message);
        } else {
          this.ordermServicoService.message(err.error.error);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['ordem-servicos']);
  }

  getTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  getClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

}
