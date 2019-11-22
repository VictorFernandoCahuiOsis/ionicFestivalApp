import { Component, OnInit } from '@angular/core';
import {BarcodeScannerOptions, BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  nombre_apellido: String
  encodeData: any;

  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  options :BarcodeScannerOptions;

  constructor(private route: Router, private barcodeScanner: BarcodeScanner) {
    this.nombre_apellido = sessionStorage.getItem('nombre_apellido')
    this.encodeData = sessionStorage.getItem('id_usuario')
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
   }

  ngOnInit() {
    //alert("Usuario: "+ sessionStorage.getItem('id_usuario'));
  }

  logOut () {
    sessionStorage.clear()
    this.route.navigate(['/inicio'])
  }

  verEventosAll () {
    this.route.navigate(['/lista-festival'])
  }

  verMisEventos () {
    this.route.navigate(['/mis-festivales'])
  }

  crearEvento () {
    this.route.navigate(['/crear-festival'])
  }

  verCodigo(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
        console.log(encodedData);
        //this.encodeData = this.id_usuario;
        //alert(this.encodeData);
    }, (err) => {
        console.log("Hubo un error : " + err);
    });                 
  }


  irFestival() {
    this.options = {
      prompt : "Escanee su Código QR "
    }
    this.barcodeScanner
      .scan(this.options)
      .then(async barcodeData =>  {
        sessionStorage.setItem('idEvento', barcodeData.text)
        this.route.navigate(['/descripcion-mi-festival'])
        //barcodeData.text
      
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

}
