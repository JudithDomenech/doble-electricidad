import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [MatToolbar, CommonModule, TranslateModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  // Te permite obtener la fecha actual
  today = new Date();

  // Indica las opciones del select
  options = [
    { value: 'es', display: 'Español' },
    { value: 'ca', display: 'Catalán' },
  ];

  selectedLang: string = 'es';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    this.translate.use(savedLang);
  }

  // Cambia el idioma de la aplicación según la selección del usuario
  onChange = (event: Event) => {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);

    localStorage.setItem('selectedLang', lang);
    this.selectedLang = lang;
  };
}
