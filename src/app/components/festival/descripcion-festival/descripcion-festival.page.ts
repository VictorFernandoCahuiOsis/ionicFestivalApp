import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators'
import {EventoService} from '../../../servicios/evento.service'
import { ToastController } from '@ionic/angular';
import * as moment from 'moment'

@Component({
  selector: 'app-descripcion-festival',
  templateUrl: './descripcion-festival.page.html',
  styleUrls: ['./descripcion-festival.page.scss'],
})
export class DescripcionFestivalPage implements OnInit {

  festival: any

  constructor( private route: Router, private eventoService: EventoService, private toastController: ToastController) { 
    //this.encodeData = "https://www.FreakyJolly.com";
    this.festival = {}
  }

  ngOnInit() {
    this.getInfoFestival()
  }
  getInfoFestival() {
    var hlp = sessionStorage.getItem('idEvento')
    this.eventoService.getEventoByKey(hlp).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(response => {

      response[0].fechainicioFormal = moment(Number(response[0].fecha_inicio)).format('YYYY/MM/DD')
      response[0].fechafinFormal = moment(Number(response[0].fecha_fin)).format('YYYY/MM/DD')
      this.festival = response[0]
      console.log('Estos son los eventos: ', response[0])
    })
  } 

  verUbicacion() {
    this.route.navigate(['/ubicacion-festival']);
  }

}
