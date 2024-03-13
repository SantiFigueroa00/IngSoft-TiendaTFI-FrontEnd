import { Stock } from "./Stock"

export interface Articulo{
    id:string,
    codigoArticulo:string,
    marca:Marca,
    categoria:Categoria,
    descripcion:string,
    precioFinal?:number,
    stocks:Stock[]
}

export interface Marca{
    nombre:string
}

export interface Categoria{
    descripcion:string
}

