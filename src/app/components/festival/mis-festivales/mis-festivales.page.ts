import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { EventoService } from '../../../servicios/evento.service'
import * as moment from 'moment'

@Component({
  selector: 'app-mis-festivales',
  templateUrl: './mis-festivales.page.html',
  styleUrls: ['./mis-festivales.page.scss'],
})
export class MisFestivalesPage implements OnInit {

  listAllEventos: any

  


  constructor(private route: Router, private eventoService: EventoService) {
    this.listAllEventos = []
  }

  ngOnInit() {
    this.getAllEventos()
  }

  getAllEventos() {

    var id_usuario = sessionStorage.getItem('id_usuario')

    this.eventoService.listarAllEventsByIdUsuario(id_usuario).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(response => {
      this.listAllEventos = response

      for (let a of this.listAllEventos) {
        a.fechainicioFormal = moment(Number(a.fecha_inicio)).format('YYYY/MM/DD')
        a.fechafinFormal = moment(Number(a.fecha_fin)).format('YYYY/MM/DD')
      }
    })
  }

  verDescripcion(festi) {
    sessionStorage.setItem('idEvento',festi.key )
    sessionStorage.setItem('festival', JSON.stringify(festi))
    this.route.navigate(['/descripcion-mi-festival'])
  }

  goBack() {
    this.route.navigate(['/profile'])
  }

}
