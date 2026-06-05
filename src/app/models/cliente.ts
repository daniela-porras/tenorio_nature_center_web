export class Cliente {
    constructor(
        public idCliente: number,
        public idUsuario: number,
        public nombre: string,
        public identificador: string,
        public fechaNac: Date,
        public telefono: string,
        public nacionalidad: string,
        public fechaRegistro: Date,
        public idEmpresaCliente?: number
    ){}
}
