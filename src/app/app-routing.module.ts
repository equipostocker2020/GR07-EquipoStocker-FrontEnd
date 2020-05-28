import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent, data: {titulo: 'Registrarse en StockerApp'}},
  { path: 'login', component: LoginComponent, data: {titulo: 'Login'},  },
  { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'},  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
