import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuarios {

  // Inyectamos el cliente HTTP de Angular
  private http = inject(HttpClient);

  // Dirección de la API pública
  private url = 'https://jsonplaceholder.typicode.com/users';

  // Petición GET que regresa la lista de usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }
}