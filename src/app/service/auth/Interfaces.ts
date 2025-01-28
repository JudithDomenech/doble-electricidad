// Interfaces para el login de usuario
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}
// Interfaces para recuperar el usuario
export interface UserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

// Interfaz para las Facturas
export interface Factura {
  datosFactura: DatosFactura;
  datosCliente: DatosCliente;
  datosSuministro: DatosSuministro;
  facturacion: Facturacion;
}

// Subinterfaces para desglosar las propiedades
export interface DatosFactura {
  nombreFactura: string;
  fechaEmision: string;
  PeriodoFacturacion: string;
  CUPS: string;
}

export interface DatosCliente {
  nombre: string;
  direccion: string;
  CIF: string;
}

export interface DatosSuministro {
  direccion: string;
  PotenciaContratada: string;
  tension: string;
  tarifa: string;
}

export interface Facturacion {
  importe: number;
}
