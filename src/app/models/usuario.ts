export class User{
    constructor(
        public idUsuario:number,
        public nombre:string,
        public correo:string,
        public contrasena:string,
        public apellido?:string,
        public rol?:string,
        public descripcion?:string,
        public imagen?:string,
        public identificador?:string,
        public fechaNac?:string,
        public telefono?:string,
        public nacionalidad?:string,
        public confirmarContrasena?:string
    ){}
}