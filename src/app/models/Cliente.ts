import { CondicionTributaria } from "./CondicionTributaria";

export interface Cliente{
    id:string;
    dni:string;
    cuil:string;
    nombre:string;
    apellido:string;
    condicionTributaria:CondicionTributaria;
}