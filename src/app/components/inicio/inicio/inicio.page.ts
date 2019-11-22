import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import { map } from 'rxjs/operators';
import {UserService} from '../../../servicios/usuario.service'
import {EventoService} from '../../../servicios/evento.service'



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor( private route: Router,private  userService: UserService, private eventoService: EventoService) { }

  ngOnInit() {
 
    //this.insertCustomer()
    //this.getCustomers()
    //this.getCustomerById()
  }


  irLogin () {
    this.route.navigate(['/login'])
  }

  irRegistro () {
    this.route.navigate(['/registro'])
  }

  irFestivales () {
    this.route.navigate(['/lista-festival'])
  }

  /*
  irCrearFest () {
    var hlp = {
      nombre_evento: '',
      capacidad_total: 20,
      asistentes: 0,
      latitud_evento: '-16.402243',
      longitud_evento: '-71.537626',
      fecha_inicio: '1573088479000',
      fecha_fin: '1573174879000',
      url_imagen: 'https://firebasestorage.googleapis.com/v0/b/plataformaseme.appspot.com/o/festival1.png?alt=media&token=c5d18a51-0590-4266-b0fc-ac1ac15a63cc',
      descripcion: 'Calidad y Éxito, Contáctanos: (054) 285007 949084356 - 923517788 www.stendhal.edu.pe Calle Álvarez Thomas 307 – Arequipa',
      id_usuario: '-LtGCdO4ubDV8RQWaNC9'
    }
    this.eventoService.createEvento(hlp)
  }
  */

  /*

  insertCustomer () {
    this.userService.createCustomer()
  }

  irFestivales () {
    this.route.navigate(['/lista-festival'])
  }

  irCrearFest () {
    this.route.navigate(['/crear-festival'])
  }

  getCustomers () {
    this.userService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      console.log('Estos son los curome: ', customers)
    });
  }

  getCustomerById () {
    this.userService.getCustomerById().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(customers => {
      console.log('Esto es por el filtro: ', customers)
    });
  }
  */

  
}
