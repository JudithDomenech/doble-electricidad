import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './app/shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa el módulo de MatToolbar

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    MatToolbarModule, // Agrega MatToolbarModule a los imports
  ],
  providers: [],
})
export class AppModule {}
