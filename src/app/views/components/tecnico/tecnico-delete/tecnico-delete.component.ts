import { TecnicoService } from 'src/app/services/tecnico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

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

  ngOnInit(): void {

    this.id_tecnico = this.route.snapshot.paramMap.get('id')!;

    this.service.findById(this.id_tecnico).subscribe(resposta => {
      this.tecnico = resposta;

    });

  }

  delete(): void {
    this.service.delete(this.id_tecnico).subscribe(resposta => {
      this.router.navigate(['tecnicos']);
      this.service.message('Técnico removido com sucesso.')
    },
      err => {
        if (err.error.status == 400) {
          this.service.message(err.error.error);
        }
      }
    );

  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }
}