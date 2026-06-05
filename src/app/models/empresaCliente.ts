export class EmpresaCliente {
    constructor(
        public idEmpresaCliente: number,
        public razonSocial: string,
        public cedulaJuridica: string,
        public email: string,
        public telefono?: string
    ){}
}
