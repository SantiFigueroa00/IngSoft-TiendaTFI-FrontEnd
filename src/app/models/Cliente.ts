import { CondicionTributaria } from "./CondicionTributaria";

export interface Cliente{
    id:string;
    numeroDocumento:NumeroDocumento;
    nombre:string;
    apellido:string;
    condicionTributaria:CondicionTributaria;
}

export interface NumeroDocumento{
    numero:string,
    descripcion:string,
    tipoDocumento:number
}