import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FacturaService } from '../../../services/factura.service';
import { EstadoPagoService } from '../../../services/estadopago.service';
import { ReservaService } from '../../../services/reserva.service';
import { ParticipanteService } from '../../../services/participante.service';
import { FacturaParticipanteService } from '../../../services/facturaparticipante.service';
 
@Component({
  selector: 'app-facturas-admin',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './facturas-admin.html',
  styleUrl: './facturas-admin.css'
})
export class FacturasAdmin implements OnInit {
 
  public facturas: any[] = [];
  public estadosPago: any[] = [];
  public reservas: any[] = [];
  public participantesReserva: any[] = [];
  public participantesSeleccionados: number[] = [];
  public mensaje: string = '';
  public modoEdicion: boolean = false;
  public facturaIdEliminar: number = 0;
 
  public metodosPago: string[] = ['Efectivo', 'Tarjeta', 'Transferencia'];
  public monedas: string[] = ['CRC', 'USD'];
 
  public factura: any = {
    idReserva:     null,
    idEstadoPago:  null,
    numeroFactura: '',
    fechaFactura:  '',
    metodoPago:    null,
    moneda:        null,
    fechaPago:     '',
    subtotal:      '',
    impuesto:      '',
    descuento:     '',
    precioTotal:   ''
  };
 
  constructor(
    private facturaService: FacturaService,
    private estadoPagoService: EstadoPagoService,
    private participanteService: ParticipanteService,
    private facturaParticipanteService: FacturaParticipanteService,
    private cdr: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.loadFacturas();
    this.loadEstadosPago();
    this.loadReservas();
  }
 
  loadFacturas() {
    this.facturaService.getFacturas().subscribe({
      next: (response: any) => {
        this.facturas = response;
        this.cdr.detectChanges();
      },
      error: (err) => { console.log(err); }
    });
  }
 
  loadEstadosPago() {
    this.estadoPagoService.getEstadosPago().subscribe({
      next: (response: any) => {
        this.estadosPago = response;
        this.cdr.detectChanges();
      },
      error: (err) => { console.log(err); }
    });
  }
 
  loadReservas() {
  this.participanteService.getReservasDisponiblesParaFacturar().subscribe({
    next: (response: any) => {
      console.log('Reservas disponibles:', response);

      this.reservas = response;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
      }
    });
  } 
  onReservaChange() {
    this.participantesReserva = [];
    this.participantesSeleccionados = [];
 
    if (!this.factura.idReserva) return;
 
    this.participanteService
      .getParticipantesSinFacturaByReserva(this.factura.idReserva)
      .subscribe({
        next: (response: any) => {
          this.participantesReserva = response;
          this.cdr.detectChanges();
        },
        error: (err) => { console.log(err); }
      });
  }
 
  toggleParticipante(id: number, event: any) {
    if (event.target.checked) {
      this.participantesSeleccionados.push(id);
    } else {
      this.participantesSeleccionados =
        this.participantesSeleccionados.filter(x => x !== id);
    }
  }
 
  calcularTotal() {
    const subtotal  = parseFloat(this.factura.subtotal)  || 0;
    const impuesto  = parseFloat(this.factura.impuesto)  || 0;
    const descuento = parseFloat(this.factura.descuento) || 0;
    this.factura.precioTotal = parseFloat((subtotal + impuesto - descuento).toFixed(2));
  }
 
  editarFactura(f: any) {
    this.modoEdicion = true;
    const estadoEncontrado = this.estadosPago.find(e => e.nombre === f.nombreestado);
 
    this.factura.idFactura     = f.idfactura;
    this.factura.idEstadoPago  = estadoEncontrado ? estadoEncontrado.idestadopago : null;
    this.factura.numeroFactura = f.numerofactura;
    this.factura.fechaFactura  = f.fechafactura ? f.fechafactura.substring(0, 10) : '';
    this.factura.metodoPago    = f.metodopago;
    this.factura.moneda        = f.moneda;
    this.factura.fechaPago     = f.fechapago?.Valid ? f.fechapago.Time.substring(0, 10) : '';
    this.factura.subtotal      = parseFloat(f.subtotal)    || 0;
    this.factura.impuesto      = parseFloat(f.impuesto)    || 0;
    this.factura.descuento     = parseFloat(f.descuento)   || 0;
    this.factura.precioTotal   = parseFloat(f.preciototal) || 0;
 
    this.cdr.detectChanges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 
  guardarFactura() {
    const payload = {
      ...this.factura,
      subtotal:    String(this.factura.subtotal),
      impuesto:    String(this.factura.impuesto),
      descuento:   String(this.factura.descuento),
      precioTotal: String(this.factura.precioTotal)
    };
 
    if (this.modoEdicion) {
      this.facturaService.updateFactura(payload).subscribe({
        next: () => {
          this.mensaje = 'Factura actualizada correctamente';
          this.cancelar();
          this.loadFacturas();
          this.loadReservas();
          setTimeout(() => { this.mensaje = ''; }, 3000);
        },
        error: (err) => { console.log(err); }
      });
 
    } else {
      this.facturaService.createFactura(payload).subscribe({
        next: (response: any) => {
          const idFactura = response.idFactura;
          const vinculos = this.participantesSeleccionados.map((idParticipante: number) =>
            this.facturaParticipanteService.createFacturaParticipante({
              idFactura:      idFactura,
              idParticipante: idParticipante
            })
          );
          Promise.all(vinculos.map(v => v.toPromise())).then(() => {
            this.mensaje = 'Factura creada correctamente';
            this.cancelar();
            this.loadFacturas();
            this.loadReservas();
            setTimeout(() => { this.mensaje = ''; }, 3000);
          });
        },
        error: (err) => { console.log(err); }
      });
    }
  }
 
  seleccionarFacturaEliminar(id: number) {
    this.facturaIdEliminar = id;
  }
 
  confirmarEliminarFactura() {
    this.facturaService.deleteFactura(this.facturaIdEliminar).subscribe({
      next: () => {
        this.mensaje = 'Factura eliminada correctamente';
        this.loadFacturas();
        this.loadReservas();
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => { console.log(err); }
    });
  }
 
  cancelar() {
    this.modoEdicion = false;
    this.participantesReserva = [];
    this.participantesSeleccionados = [];
    this.factura = {
      idReserva:     null,
      idEstadoPago:  null,
      numeroFactura: '',
      fechaFactura:  '',
      metodoPago:    null,
      moneda:        null,
      fechaPago:     '',
      subtotal:      '',
      impuesto:      '',
      descuento:     '',
      precioTotal:   ''
    };
  }
}
 