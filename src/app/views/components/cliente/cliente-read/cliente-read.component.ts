import { Cliente } from './../../../../models/cliente';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from './../../../../services/cliente.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'acoes'];

  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClienteService, private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  ngOnInit(): void {
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta => {
      this.clientes = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    }));
  }

  navigateToCreate(): void {
    this.router.navigate(['clientes/create']);
  }

}
