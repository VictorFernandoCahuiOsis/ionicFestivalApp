import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../../servicios/usuario.service'
import { map } from 'rxjs/operators';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: any = {
    correo_electronico: String,
    password: String
  }

  constructor(private route: Router, private userService: UserService, private toastController: ToastController) {
    this.usuario.correo_electronico = ''
    this.usuario.password = ''
  }

  ngOnInit() {
  }

  irRegistro() {
    this.route.navigate(['/registro'])
  }

  login() {

    this.userService.loginUsuario(this.usuario).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(async usuarios => {

      for (let a of usuarios) {
        if (a.password == this.usuario.password) {
          console.log('Ingreso: ', a)

          sessionStorage.setItem('id_usuario', a.key)
          sessionStorage.setItem('nombre_apellido', a.nombre_apellido)

          const toast = await this.toastController.create({
            message: 'Bienvenido.',
            duration: 2000
          });
          toast.present();
          this.route.navigate(['/profile'])
          return
        }
      }

      const toast = await this.toastController.create({
        message: 'Datos incorrectos.',
        duration: 2000
      });
      toast.present();

      console.log('No ingreso')

    });

  }


  goBack() {
    this.route.navigate(['/inicio'])
  }


}
