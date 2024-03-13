export interface Stock{
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
}