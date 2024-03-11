export interface Sesion{
    puntoDeVenta:PuntoDeVenta,
    vendedor:Vendedor
}

export interface PuntoDeVenta{
    id:string,
    nombre:string,
    sucursal:Sucursal
}

export interface Vendedor{
    apellido:string,
    nombre:string,
    legajo:number
}

export interface Sucursal{
    id:string,
    nombre:string
}