import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/orderServico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdermServicoService } from 'src/app/services/orderm-servico.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-ordem-servico-open',
  templateUrl: './ordem-servico-open.component.html',
  styleUrls: ['./ordem-servico-open.component.css']
})
export class OrdemServicoOpenComponent implements AfterViewInit {

  ordemServicos: OrdemServico[] = [];

  displayedColumns: string[] = ['id', 'abertura', 'cliente', 'status', 'prioridade', 'tecnico', 'acoes'];

  dataSource = new MatTableDataSource<OrdemServico>(this.ordemServicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OrdermServicoService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) { }

  ngAfterViewInit(): void {
    this.fidAll();
  }

  fidAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(os => {
        if (os.status == "ABERTA" || os.status == "EM ANDAMENTO") {
          this.ordemServicos.push(os);
        }
      });
      this.getNameClientes();
      this.getNameTecnicos();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.ordemServicos);
      this.dataSource.paginator = this.paginator;
    });
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
