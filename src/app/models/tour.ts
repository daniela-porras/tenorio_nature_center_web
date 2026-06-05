export class Tour {
    constructor(
        public idTour: number,
        public nombre: string,
        public descripcion: string,
        public horario: string,
        public duracion: number,
        public cuposMaximos: number,
        public precioBase: number
    ){}
}
