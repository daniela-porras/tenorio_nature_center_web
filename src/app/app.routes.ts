import { Routes } from '@angular/router';
import {Home} from './components/home/home'
import { Login } from './components/login/login';
import { Error } from './components/error/error';
import { Perfil } from './components/perfil/perfil';
import { Reservas } from './components/mis-reservas/reservas';
import { Admin } from './components/admin/admin';
import { Tours } from './components/tours/tours';
import { Vehiculos } from './components/vehiculos/vehiculos';
import { Chofer } from './components/chofer/chofer';
import { ToursAdmin } from './components/admin/tours-admin/tours-admin';
import { Guias } from './components/guias/guias';
import { Ubicaciones } from './components/ubicaciones/ubicaciones';
import { ReservasAdmin } from './components/admin/reservas-admin/reservas-admin';
import { Registro } from './components/registro/registro';

export const routes: Routes = [
    //Público
    {path:'',component:Home},
    {path:'login',component:Login},
    //Navegación principal
    { path: 'tour/:id', component: Tours},
    { path: 'vehiculo/:id', component: Vehiculos},
    { path: 'chofer/:id', component: Chofer},
    { path: 'guia/:id', component: Guias},
    { path: 'ubicacion/:id', component: Ubicaciones},
    //Usuario autenticado
    { path: 'perfil', component: Perfil},
    { path: 'reservas', component: Reservas},
    //Admin
    { path: 'admin', component: Admin},
    { path:'admin/tours', component: ToursAdmin},
    { path: 'admin/reservas', component: ReservasAdmin},
    //Registro
    {path:'',component:Home},
    {path:'login',component:Login},
    {path:'register',component:Registro},
    //Error
    {path:'**',component:Error}
];
