import { Observable } from 'rxjs';
import { OrdemServico } from './../models/orderServico';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdermServicoService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<OrdemServico[]> {
    const url = this.baseUrl + '/ordem-servicos';
    return this.http.get<OrdemServico[]>(url);
  }

  findById(id: any): Observable<OrdemServico> {
    const url = `${this.baseUrl}/ordem-servicos/${id}`;
    return this.http.get<OrdemServico>(url);
  }

  create(ordemServico: OrdemServico): Observable<OrdemServico> {
    const url = this.baseUrl + '/ordem-servicos';
    return this.http.post<OrdemServico>(url, ordemServico);
  }

  update(ordemServico: OrdemServico): Observable<OrdemServico> {
    const url = `${this.baseUrl}/ordem-servicos/${ordemServico.id}`;
    return this.http.put<OrdemServico>(url, ordemServico);
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/ordem-servicos/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
