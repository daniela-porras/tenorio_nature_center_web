import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ClienteService } from '../../../services/cliente.service';
import { EmpresaClienteService } from '../../../services/empresacliente.service';

@Component({
  selector: 'app-clientes-admin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './clientes-admin.html',
  styleUrl: './clientes-admin.css'
})
export class ClientesAdmin implements OnInit {

  public clientes:any[] = [];
  public empresas:any[] = [];

  public mensaje:string = '';
  public idClienteEliminar:number = 0;

  public editando:boolean = false;

  public cliente:any = {
    idEmpresaCliente: null,
    idUsuario: null,
    nombre: '',
    identificador: '',
    fechaNac: '',
    telefono: '',
    nacionalidad: '',
    fechaRegistro: ''
  };

  constructor(
    private clienteService: ClienteService,
    private empresaClienteService: EmpresaClienteService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {

    this.loadClientes();
    this.loadEmpresas();

  }

  loadClientes(){

    this.clienteService.getClientes().subscribe({

      next:(response:any)=>{

        console.log('CLIENTES', response);

        this.clientes = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  loadEmpresas(){

    this.empresaClienteService.getEmpresasCliente().subscribe({

      next:(response:any)=>{

        console.log('EMPRESAS', response);

        this.empresas = response;
        this.cdr.detectChanges();

      },

      error:(err)=>{

        console.log(err);

      }

    });

  }

  guardarCliente(){

    if(this.editando){

      this.clienteService.updateCliente(this.cliente)
      .subscribe({

        next:()=>{

          this.mensaje = 'Cliente actualizado correctamente';

          this.cancelar();
          this.loadClientes();

          setTimeout(()=>{

            this.mensaje = '';

          },3000);

        },

        error:(err)=>{

          console.log('ERROR UPDATE', err);

        }

      });

    }else{

      this.clienteService.createCliente(this.cliente)
      .subscribe({

        next:()=>{

          this.mensaje = 'Cliente creado correctamente';

          this.cancelar();
          this.loadClientes();

          setTimeout(()=>{

            this.mensaje = '';

          },3000);

        },

        error:(err)=>{

          console.log('ERROR CREATE', err);

        }

      });

    }

  }

  editarCliente(cliente:any){

    this.editando = true;

    this.cliente = {

      idCliente: cliente.idcliente,
      idEmpresaCliente: cliente.idempresacliente?.Int32 ?? null,
      idUsuario:
      cliente.idusuario?.Valid
      ? cliente.idusuario.Int32
      : null,
      nombre: cliente.nombre,
      identificador: cliente.identificador,
      fechaNac: cliente.fechanac?.split('T')[0],
      telefono: cliente.telefono,
      nacionalidad: cliente.nacionalidad,
      fechaRegistro: cliente.fecharegistro?.split('T')[0]

    };

  }

  seleccionarClienteEliminar(id:number){

    console.log('CLIENTE A ELIMINAR:', id);
    this.idClienteEliminar = id;

  }

  confirmarEliminarCliente(){

    console.log('CONFIRMAR ELIMINAR');
    console.log('ID:', this.idClienteEliminar);
    this.clienteService.deleteCliente(this.idClienteEliminar)
    .subscribe({

      next:()=>{

        this.mensaje = 'Cliente eliminado correctamente';

        this.loadClientes();

        setTimeout(()=>{

          this.mensaje = '';

        },3000);

      },

      error:(err)=>{

        console.log('ERROR DELETE', err);

      }

    });

  }

  cancelar(){

    this.editando = false;

    this.cliente = {

      idEmpresaCliente: null,
      idUsuario: null,
      nombre: '',
      identificador: '',
      fechaNac: '',
      telefono: '',
      nacionalidad: '',
      fechaRegistro: ''

    };

  }

}