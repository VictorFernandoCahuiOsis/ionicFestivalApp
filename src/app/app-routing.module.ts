import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'inicio', loadChildren: './components/inicio/inicio/inicio.module#InicioPageModule' },
  { path: 'login', loadChildren: './components/inicio/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './components/inicio/registro/registro.module#RegistroPageModule' },
  { path: 'lista-festival', loadChildren: './components/festival/lista-festival/lista-festival.module#ListaFestivalPageModule' },
  { path: 'crear-festival', loadChildren: './components/festival/crear-festival/crear-festival.module#CrearFestivalPageModule' },
  { path: 'descripcion-festival', loadChildren: './components/festival/descripcion-festival/descripcion-festival.module#DescripcionFestivalPageModule' },
  { path: 'descripcion-mi-festival', loadChildren: './components/festival/descripcion-mi-festival/descripcion-mi-festival.module#DescripcionMiFestivalPageModule' },
  { path: 'ubicacion-festival', loadChildren: './components/festival/ubicacion-festival/ubicacion-festival.module#UbicacionFestivalPageModule' },
  { path: 'asistencia-festival', loadChildren: './components/festival/asistencia-festival/asistencia-festival.module#AsistenciaFestivalPageModule' },
  { path: 'codigo-festival', loadChildren: './components/festival/codigo-festival/codigo-festival.module#CodigoFestivalPageModule' },
  { path: 'profile', loadChildren: './components/user/profile/profile.module#ProfilePageModule' },
  { path: 'mis-festivales', loadChildren: './components/festival/mis-festivales/mis-festivales.module#MisFestivalesPageModule' },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
