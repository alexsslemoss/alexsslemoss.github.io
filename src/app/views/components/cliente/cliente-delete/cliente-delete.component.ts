import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tecnico = '';

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute) { }

  tecnico: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  ngOnInit(): void {

    this.id_tecnico = this.route.snapshot.paramMap.get('id')!;
    this.service.findById(this.id_tecnico).subscribe(resposta => {
      this.tecnico = resposta;

    });

  }

  delete(): void {
    this.service.delete(this.id_tecnico).subscribe(resposta => {
      this.router.navigate(['clientes']);
      this.service.message('Cliente removido com sucesso.')
    },
      err => {
        if (err.error.status == 400) {
          this.service.message(err.error.error);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(['clientes']);
  }
}