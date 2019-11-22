import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../servicios/usuario.service'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';
import { async } from 'q';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: any = {
    nombre_apellido: String,
    correo_electronico: String,
    password: String,
    codigo_qr: String
  }
  
  constructor(private route: Router,private userService: UserService, private toastController: ToastController) { 

    this.usuario.nombre_apellido = ''
    this.usuario.correo_electronico = ''
    this.usuario.password = ''
    this.usuario.codigo_qr = ''

  }

  ngOnInit() {
  
  }

  registrar () {
    console.log('EStos son los datos que guardare: ', this.usuario)
    
    this.userService.createUsuario(this.usuario).then(async response => {
      
      sessionStorage.setItem('id_usuario', response.ref.key)
      sessionStorage.setItem('nombre_apellido', this.usuario.nombre_apellido)

      console.log('Esta es el response: ', response)


      const toast = await this.toastController.create({
        message: 'Bienvenido.',
        duration: 2000
      });
      
      toast.present();
      this.route.navigate(['/profile'])
    }, error => {
      console.log('Este es el error: ', error)
    })
    
  }


  goBack() {
    this.route.navigate(['/inicio'])
  }

  irLogin () {
    this.route.navigate(['/login'])
  }


}
