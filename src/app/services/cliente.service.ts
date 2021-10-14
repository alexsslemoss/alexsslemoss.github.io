import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, PartialObserver } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Cliente[]> {
    const url = this.baseUrl + '/clientes';
    return this.http.get<Cliente[]>(url);
  }

  findById(id: any): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<Cliente>(url);
  }

  create(cliente: Cliente): Observable<Cliente> {
    const url = environment.baseUrl + '/clientes'
    return this.http.post<Cliente>(url, cliente);
  }

  update(tecnico: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/clientes/${tecnico.id}`;
    return this.http.put<Cliente>(url, tecnico);
  }

  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/clientes/${id}`;
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
