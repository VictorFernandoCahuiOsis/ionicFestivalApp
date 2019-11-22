//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-codigo-festival',
  templateUrl: './codigo-festival.page.html',
  styleUrls: ['./codigo-festival.page.scss'],
})
export class CodigoFestivalPage implements OnInit {

  //constructor(private qrScanner: QRScanner) { }
  constructor(){}

  ngOnInit() {
  }
  /*
  leerCodigo () {
    console.log("asdasdas");
    // Pedir permiso de utilizar la camara
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // el permiso fue otorgado
        // iniciar el escaneo
        let scanSub = this.qrScanner.scan().subscribe((texto: string) => {
          console.log('Scanned something', texto);
          
          this.qrScanner.hide(); // esconder el preview de la camara
          scanSub.unsubscribe(); // terminar el escaneo
        }); 
  
      } else if (status.denied) {
        // el permiso no fue otorgado de forma permanente
        // debes usar el metodo QRScanner.openSettings() para enviar el usuario a la pagina de configuracion
        // desde ahí podrán otorgar el permiso de nuevo
      } else {
        // el permiso no fue otorgado de forma temporal. Puedes pedir permiso de en cualquier otro momento
      }
    }) .catch((e: any) => console.log('El error es: ', e));
  }
  
*/
}
