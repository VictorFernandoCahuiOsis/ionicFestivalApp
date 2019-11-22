import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { AsistenteService } from '../../../servicios/asistente.service'

@Component({
  selector: 'app-asistencia-festival',
  templateUrl: './asistencia-festival.page.html',
  styleUrls: ['./asistencia-festival.page.scss'],
})
export class AsistenciaFestivalPage implements OnInit {

  listAsi: any

  constructor(private route: Router, private asistenteService: AsistenteService) {
    this.listAsi = []
  }

  ngOnInit() {
    this.getAllAsitentes()
  }


  getAllAsitentes() {

    var id_evento = sessionStorage.getItem('idEvento')

    this.asistenteService.listarByIdEvento(id_evento).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(response => {
      console.log('Estos son los asistentes: ', response)
      this.listAsi = response
    })

  }

  goBack() {
    this.route.navigate(['/descripcion-mi-festival']);
  }

}
