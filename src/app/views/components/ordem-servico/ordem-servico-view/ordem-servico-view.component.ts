import { OrdemServico } from './../../../../models/orderServico';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdermServicoService } from 'src/app/services/orderm-servico.service';

@Component({
  selector: 'app-ordem-servico-view',
  templateUrl: './ordem-servico-view.component.html',
  styleUrls: ['./ordem-servico-view.component.css']
})
export class OrdemServicoViewComponent implements OnInit {

  ordemServico: OrdemServico = {
    prioridade: '',
    status: '',
    observacao: '',
    cliente: '',
    tecnico: ''
  }

  constructor(
    private route: ActivatedRoute,
    private servico: OrdermServicoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.servico.findById(this.ordemServico.id).subscribe(resposta => {
      this.ordemServico = resposta;
    });
  }

  voltar(): void {
    this.router.navigate(['ordem-servicos'])
  }

}
