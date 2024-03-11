import { Order } from "./Order";

export interface Provider{
    id?:string,
    compName?:string,
    item?:string,
    webSite?:string,
    phone?:string,
    email?:string,
    address:{
        street?:string,
        number?:number,
        zip?:string,
        country?:string,
        province?:string,
        locality?:string
    },
    taxData:{
        cuit?:string,
        iva?:string
    },
    logo?:string,
    contact:{
        name?:string,
        phone?:string,
        email?:string,
        role?:string
    },
    orders?: Order[];
    isDeleted?:boolean
}