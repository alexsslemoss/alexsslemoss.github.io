import { ClienteService } from './../../../../services/cliente.service';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Router } from '@angular/router';
import { OrdermServicoService } from './../../../../services/orderm-servico.service';
import { MatPaginator } from '@angular/material/paginator';
import { OrdemServico } from './../../../../models/orderServico';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ordem-servico-read',
  templateUrl: './ordem-servico-read.component.html',
  styleUrls: ['./ordem-servico-read.component.css']
})
export class OrdemServicoReadComponent implements OnInit {

  ordemServicos: OrdemServico[] = [];

  displayedColumns: string[] = ['id', 'abertura', 'encerramento', 'cliente', 'status', 'prioridade', 'tecnico', 'acoes'];

  dataSource = new MatTableDataSource<OrdemServico>(this.ordemServicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OrdermServicoService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.fidAll();
  }

  fidAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.ordemServicos = resposta;
      this.getNameClientes();
      this.getNameTecnicos();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.ordemServicos);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['ordem-servicos/create']);
  }

  getNameClientes(): void {
    this.ordemServicos.forEach(orderServico => {
      this.clienteService.findById(orderServico.cliente).subscribe(resposta => {
        orderServico.cliente = resposta.nome;
      });
    });
  }

  getNameTecnicos(): void {
    this.ordemServicos.forEach(orderServico => {
      this.tecnicoService.findById(orderServico.tecnico).subscribe(resposta => {
        orderServico.tecnico = resposta.nome;
      });
    });
  }

  setColorPriority(column: any): any {
    if (column == 'BAIXA') {
      return 'baixa';
    } else if (column == 'MEDIA') {
      return 'media';
    } else {
      return 'alta';
    }
  }


}
