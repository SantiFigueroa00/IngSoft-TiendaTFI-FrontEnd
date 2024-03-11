export interface Order {
      id : string;
      dateE : Date;
      dateR : Date;
      info : string;
      provider : string;
      products: {
        id: string;
        name: string;
        quantity: number;
        price: number;
      }[]; 
      total:number;
      state:boolean
}