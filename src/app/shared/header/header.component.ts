import { Component, inject, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersService } from '../../service/auth/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    NgClass,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  // Inyección de dependencias equivalente a pasarlo por el construtor
  private userService = inject(UsersService);
  private router = inject(Router);
  constructor(private translate: TranslateService) {
    this.translate.use('es');
  }

  // Incicializa llamando al método checkLoginStatus antes de que el componente comience a renderizarse.
  ngOnInit(): void {
    this.checkLoginStatus();
  }
  // Método para verificar si el usuario está logueado o no. !! Convierte el valor en un booleano
  checkLoginStatus() {
    this.isLoggedIn = !!this.userService.getToken();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  // Método para el logOut, elimina el token, setea el estado de isLoggedIn a falso,borra el localStorage y navega hacia la ruta '' que es el login.
  logout() {
    this.userService.removeToken();
    this.isLoggedIn = false;
    localStorage.removeItem('profileData');
    this.router.navigate(['']);
  }
}
