import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BarcodeScannerOptions, BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { map } from 'rxjs/operators'
import {EventoService} from '../../../servicios/evento.service'
import { ToastController } from '@ionic/angular';
import * as moment from 'moment'

import {UserService} from '../../../servicios/usuario.service'
import {AsistenteService} from '../../../servicios/asistente.service'

@Component({
  selector: 'app-descripcion-mi-festival',
  templateUrl: './descripcion-mi-festival.page.html',
  styleUrls: ['./descripcion-mi-festival.page.scss'],
})
export class DescripcionMiFestivalPage implements OnInit {

  encodeData: any;

  //encodeData : string ;
  //encodedData : {} ;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  options :BarcodeScannerOptions;

  festival: any
  constructor( private route: Router, private barcodeScanner: BarcodeScanner, 
    private eventoService: EventoService, private toastController: ToastController,
    private asistenteService: AsistenteService, private userService: UserService) { 
    //this.encodeData = "https://www.FreakyJolly.com";
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

    this.festival = {}
  }

  


  //constructor(private route: Router) { }

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


  asistencia() {
    this.options = {
      prompt : "Escanee su Código QR "
    }
    this.barcodeScanner
      .scan(this.options)
      .then(async barcodeData =>  {
        
        if (Number(this.festival.asistentes) >= Number(this.festival.capacidad_total)) {
          const toast = await this.toastController.create({
            message: 'Capacidad Superada.',
            duration: 2000
          });
          toast.present();
          return
        } else {
          
          
          var hlp = {
            asistentes: Number(this.festival.asistentes) + 1
          }
          
          if ((barcodeData.text).length < 12) {
            return 
          }

          // this.festival.key
          console.log('Aqui debo actualizar la asistencia jajajajaj')
  
          this.eventoService.updateEvento(this.festival.key,hlp)
          const toast = await this.toastController.create({
            message: 'Asistencia Registrada.',
            duration: 2000
          });
          toast.present();
          
          // barcodeData.text
          // Aca tengo que registrar ese usuario en la tabla de asistentes  aun evento

          // Primero tengo que buscar quien es el asistente
          this.userService.getUsuarioByKey(barcodeData.text).snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(response => {
            
            response[0]
            
            var hlpAsitente = {
              nombre_usuario: response[0].nombre_apellido,
              id_evento: this.festival.key
            }

            this.asistenteService.createAsistencia(hlpAsitente)

            console.log('Estos son los eventos: ', response[0])
          })

          //alert("Barcode data " + JSON.stringify(barcodeData));
          
          this.scannedData = barcodeData;
        }

      
      
      
      
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  encodedText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
        console.log(encodedData);
        this.encodeData = encodedData;
    }, (err) => {
        console.log("Error occured : " + err);
    });                 
  }


  goBack () {
    this.route.navigate(['/profile'])
  }

 /* encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

        console.log(encodedData);
        this.encodedData = encodedData;

    }, (err) => {
        console.log("Error occured : " + err);
    });                 
}*/


  verAsistentes () {
    this.route.navigate(['/asistencia-festival']);
  }


  verCodigo(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.festival.key).then((encodedData) => {
        console.log(encodedData);
        //this.encodeData = this.id_usuario;
        //alert(this.encodeData);
    }, (err) => {
        console.log("Hubo un error : " + err);
    });                 
  }


}
