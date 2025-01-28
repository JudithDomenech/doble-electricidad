import { inject, Injectable } from '@angular/core';
import { LoginRequest, UserResponse } from './Interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private cookies: CookieService) {}
  private http = inject(HttpClient);
  loginApiUrl = 'https://reqres.in/api/login';

  // Use la API de reqres https://reqres.in. para poder hacer el login y obtener el token.
  login(user: LoginRequest): Observable<any> {
    return this.http.post<LoginRequest>(this.loginApiUrl, user);
  }

  // Guardar el token en las cookies
  setToken(token: string) {
    this.cookies.set('token', token);
  }
  //Recuperamos el token de las cookies
  getToken() {
    return this.cookies.get('token');
  }
  //Eliminamos el token de las cookies
  removeToken() {
    this.cookies.delete('token');
  }

  // Aquí recuperaremos el usuario logueado, lo correcto seria hacelo con el Token, pero esta api no tiene un endpoint para obtener el usuario logueado.
  getUser() {
    return this.http.get<UserResponse>('https://reqres.in/api/users/1');
  }
}
