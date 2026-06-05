export class Chofer{
    constructor(
        public idChofer:number,
        public nombre:string,
        public identificador:string,
        public fechaNac:Date,
        public telefono:string,
        public email:string,
        public tipoLicencia:string,
        public nacionalidad:string
    ){}
}