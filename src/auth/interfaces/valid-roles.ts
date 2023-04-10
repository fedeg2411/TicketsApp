
export enum ValidRoles{
    admin = 'admin',
    superUser ='super-user',
    user= 'user'
}

export interface detalleCompra{
    fecha,
    nro,
    codigo
}

export interface factura {
    title:string,
    descrp:string,
    detalleCompra:detalleCompra[]
    problema:string
}