import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CargarProveedorComponent } from './pages/cargar-proveedor/cargar-proveedor.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, data: {titulo: 'Registrarse en StockerApp'}},
  { path: 'login', component: LoginComponent, data: {titulo: 'Login'},  },
  { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'},  },
  { path: 'usuarios', component: UsuariosComponent , data: {titulo: 'Pagina de Usuarios'}},
  { path: 'profile', component: ProfileComponent , data: {titulo: 'Ver - Modificar Perfil'}},
  { path: 'proveedores', component: ProveedoresComponent , data: {titulo: 'Pagina de Proveedores'}},
  { path: 'proveedores/cargarproveedor', component: CargarProveedorComponent , data: {titulo: 'Cargar Nuevos Proveedores'}},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
