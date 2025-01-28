import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../service/auth/users.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { AppComponent } from '../../app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  // definición de las variables
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UsersService: UsersService,
    private translate: TranslateService
  ) {
    //Validadores de los Inputs
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.translate.use('es');
  }
  ngOnInit(): void {}

  //Función para enviar el formulario
  onSubmit() {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.UsersService.login(this.loginForm.value).subscribe({
        next: (userData) => {
          this.UsersService.setToken(userData.token);
          this.router.navigate(['/home']);
          this.loginForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Hubo un error al intentar iniciar sesión.';
        },
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
