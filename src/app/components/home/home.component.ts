import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { jsPDF } from 'jspdf';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../shared/header/header.component';
import { Factura } from '../../service/auth/Interfaces';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    HeaderComponent,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  // Definición de las variables
  facturas: Factura[] = [];
  logo = 'assets/images/logo.png';
  data = 'assets/data/facturas.json';

  private translate = inject(TranslateService);
  private http = inject(HttpClient);

  ngOnInit() {
    this.getdata();
    this.setLanguage();
  }

  // Método para configurar el lenguaje
  setLanguage() {
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    this.translate.use(savedLang);
  }

  getdata() {
    // Cargar los datos desde el archivo data.json
    this.http.get<Factura[]>(this.data).subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
        this.facturas = data;
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
      },
      complete: () => {
        console.info('Carga de datos completada');
      },
    });
  }

  displayedColumns: string[] = [
    'nombre',
    'CUPS',
    'fechaEmision',
    'importe',
    'direccion',
    'acciones',
  ];

  generatePDF(factura: Factura) {
    // Cambiado el tipo de 'factura' a Factura
    const doc = new jsPDF();

    doc.setFillColor(243, 245, 249);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      'F'
    );

    doc.addImage(this.logo, 'PNG', 10, 3, 55, 20);

    // Estilo del título
    doc.setTextColor(44, 61, 122);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`Factura: ${factura.datosFactura.nombreFactura}`, 120, 20, {
      align: 'left',
    });

    // Línea separadora
    doc.setDrawColor(44, 61, 122);
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30);

    // Recuadro para datosFactura
    doc.setDrawColor(44, 61, 122);
    doc.setLineWidth(0.3);
    doc.rect(8, 40, 194, 35);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha de emisión: ${factura.datosFactura.fechaEmision}`, 10, 50);
    doc.text(
      `Periodo de facturación: ${factura.datosFactura.PeriodoFacturacion}`,
      10,
      60
    );
    doc.text(`CUPS: ${factura.datosFactura.CUPS}`, 10, 70);

    // Recuadro para datosCliente
    doc.setDrawColor(44, 61, 122);
    doc.setLineWidth(0.3);
    doc.rect(8, 80, 194, 40);

    doc.text(`Cliente: ${factura.datosCliente.nombre}`, 10, 90);
    doc.text(
      `Dirección del cliente: ${factura.datosCliente.direccion}`,
      10,
      100
    );
    doc.text(`CIF: ${factura.datosCliente.CIF}`, 10, 110);

    // Recuadro para datosSuministro
    doc.setDrawColor(44, 61, 122);
    doc.setLineWidth(0.3);
    doc.rect(8, 120, 194, 50);

    doc.text(
      `Dirección de suministro: ${factura.datosSuministro.direccion}`,
      10,
      130
    );
    doc.text(
      `Potencia contratada: ${factura.datosSuministro.PotenciaContratada}`,
      10,
      140
    );
    doc.text(`Tensión: ${factura.datosSuministro.tension}`, 10, 150);
    doc.text(`Tarifa: ${factura.datosSuministro.tarifa}`, 10, 160);

    // Recuadro para facturacion
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setDrawColor(44, 61, 122);
    doc.setLineWidth(0.3);
    doc.rect(8, 180, 194, 20);

    doc.text(
      `Importe total: ${factura.facturacion.importe.toFixed(2)}€`,
      10,
      190
    );

    return doc;
  }

  downloadInvoices(factura: Factura) {
    // Cambiado el tipo de 'factura' a Factura
    const doc = this.generatePDF(factura);

    // Guardar el PDF
    doc.save(`${factura.datosFactura.nombreFactura}.pdf`);
  }

  viewInvoices(factura: Factura) {
    // Cambiado el tipo de 'factura' a Factura
    const doc = this.generatePDF(factura);

    // Mostrar el PDF en una nueva pestaña
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}
