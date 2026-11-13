import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiUsuarios } from '../services/api-usuarios';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {

  private api = inject(ApiUsuarios);

  // Estado de la pantalla
  usuarios = signal<Usuario[]>([]);   // Lista de usuarios
  cargando = signal<boolean>(false);  // ¿Se está cargando?
  error = signal<string>('');         // Mensaje de error

  // Se ejecuta automáticamente al abrir el componente
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando.set(true);
    this.error.set('');

    this.api.obtenerUsuarios().subscribe({
      // ✅ Si la petición sale bien
      next: (datos) => {
        this.usuarios.set(datos);
        this.cargando.set(false);
        console.log('Usuarios recibidos:', datos);
      },
      // ❌ Si la petición falla
      error: (err) => {
        console.error('Error en la petición:', err);
        this.error.set('No se pudo cargar la información. Revisa tu conexión o intenta de nuevo.');
        this.cargando.set(false);
      }
    });
  }
}