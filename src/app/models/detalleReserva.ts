export class DetalleReserva {
    constructor(
        public idDetalleReserva: number,
        public idReserva: number,
        public idTour: number,
        public idGuia: number,
        public idChofer: number,
        public idUbicacion: number,
        public idIdioma: number,
        public fechaTour: Date,
        public precioUnitario: number
    ){}
}
