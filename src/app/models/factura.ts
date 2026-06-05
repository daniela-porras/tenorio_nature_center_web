export class Factura {
    constructor(
        public idFactura: number,
        public idEstadoPago: number,
        public numeroFactura: string,
        public fechaFactura: Date,
        public metodoPago: string,
        public moneda: string,
        public subtotal: number,
        public descuento: number,
        public impuesto: number,
        public precioTotal: number,
        public fechaPago?: Date
    ){}
}
