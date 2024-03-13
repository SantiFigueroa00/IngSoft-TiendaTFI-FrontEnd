import { Articulo } from "./Articulo";
import { Cliente } from "./Cliente";
import { Pago } from "./Pago";
import { PuntoDeVenta, Vendedor } from "./Sesion";
import { Stock } from "./Stock";

export interface Venta{
    id:string;
    creadaUtc:Date;
    confirmada:boolean;
    confirmadaUtc:Date;
    vendedor?:Vendedor;
    puntoDeVenta?:PuntoDeVenta;
    cliente?:Cliente;
    tipoDeComprobante?:TipoDeComprobante;
    lineasDeVenta:LineaDeVenta[];
    pago?:Pago;
    total:number;
}

export interface LineaDeVenta{
    id:string,
    precioUnitario:number,
    cantidad:number,
    stock:StockLineaDeVenta
}

export interface StockLineaDeVenta{
    id:string,
    cantidadDisponible:number,
    cantidadReservada:number,
    talle:{
        medida:number,
        tipoTalle:{
            descripcion:string
        }
    }
    color:{
        descripcion:string
    }
    articulo:Articulo
}

export interface TipoDeComprobante{
    id:string;
    descripcion:string;
}