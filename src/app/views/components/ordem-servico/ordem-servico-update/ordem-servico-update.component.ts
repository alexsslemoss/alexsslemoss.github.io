import { Router, ActivatedRoute } from '@angular/router';
import { OrdermServicoService } from './../../../../services/orderm-servico.service';
import { ClienteService } from './../../../../services/cliente.service';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Cliente } from './../../../../models/cliente';
import { Tecnico } from './../../../../models/tecnico';
import { OrdemServico } from './../../../../models/orderServico';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-servico-update',
  templateUrl: './ordem-servico-update.component.html',
  styleUrls: ['./ordem-servico-update.component.css']
})
export class OrdemServicoUpdateComponent implements OnInit {

  id_ordemServico = '';

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  ordemServico: OrdemServico = {
    prioridade: '',
    status: '',
    observacao: '',
    cliente: '',
    tecnico: ''
  }

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private ordermServicoService: OrdermServicoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_ordemServico = this.route.snapshot.paramMap.get('id')!;
    this.findById();
    this.getClientes();
    this.getTecnicos();
  }

  findById(): void {
    this.ordermServicoService.findById(this.id_ordemServico).subscribe(resposta => {
      this.ordemServico = resposta;
    });
  }

  update(): void {
    this.convertToUpdate();
    this.ordermServicoService.update(this.ordemServico).subscribe((resposta => {
      this.router.navigate(['ordem-servicos'])
      this.ordermServicoService.message("Ordem de Serviço atualizado com sucesso.")
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

  convertToUpdate(): void {
    if (this.ordemServico.status == "ABERTO") {
      this.ordemServico.status = 0;
    } else if (this.ordemServico.status == "ANDAMENTO") {
      this.ordemServico.status = 1;
    } else if (this.ordemServico.status == "ENCERRADO") {
      this.ordemServico.status = 2;
    }

    if (this.ordemServico.prioridade == "BAIXA") {
      this.ordemServico.prioridade = 0;
    } else if (this.ordemServico.prioridade == "MEDIA") {
      this.ordemServico.prioridade = 1;
    } else if (this.ordemServico.prioridade == "ALTA") {
      this.ordemServico.prioridade = 2;
    }
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
