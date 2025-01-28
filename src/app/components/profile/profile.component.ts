import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from '../../service/auth/users.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterLink } from '@angular/router';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;
  avatarUrl: string | undefined;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    this.translate.use(savedLang);
    this.initProfileForm();
    this.loadProfileData();
  }

  // Método para inicializar el formulario
  initProfileForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      adress: ['', Validators.required],
      avatar: [''],
    });
  }

  // Método para cargar los datos del perfil
  loadProfileData() {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      const profileData = JSON.parse(storedData);
      this.profileForm.patchValue(profileData);
      this.avatarUrl = profileData.avatar;
    } else {
      // Si no hay datos en el localStorage, cargar desde el servicio
      this.getUser();
    }
  }

  getUser() {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.userData = response.data;
        this.avatarUrl = response.data.avatar;
        this.profileForm.patchValue({
          name: response.data.first_name,
          firstName: response.data.last_name,
          lastName: response.data.last_name,
          email: response.data.email,
          adress: 'Carrer falsa 123',
          avatar: response.data.avatar,
        });
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      },
      complete: () => {
        console.info('Carga de datos completada');
      },
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      //Seteamos los datos en el localStorage
      localStorage.setItem('profileData', JSON.stringify(formData));
      //Abrimos el modal de que todo ha ido correctamente
      this.dialog.open(SuccessModalComponent);
    } else {
      console.error('Formulario no válido');
    }
  }
}
