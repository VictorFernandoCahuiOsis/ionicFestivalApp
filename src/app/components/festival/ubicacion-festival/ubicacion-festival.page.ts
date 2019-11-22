import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ToastController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-ubicacion-festival',
  templateUrl: './ubicacion-festival.page.html',
  styleUrls: ['./ubicacion-festival.page.scss'],
})
export class UbicacionFestivalPage implements OnInit {

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  destino: any = {
    lat: -16.402243,
    lng: -71.537626
  };
  origen: any = {
    lat: -16.406364,
    lng: -71.524887
  };
  myLatLng;

  cargandoGeo = false;
  mapRef = null;

  festival: any
  locationCoords: any;
  timetest: any;

  constructor( private androidPermissions: AndroidPermissions,
               private toastController: ToastController,
               private locationAccuracy: LocationAccuracy,
               private route: Router,
               private plt: Platform,
               private geolocation: Geolocation,
               private loadingCtrl: LoadingController)
  {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();

  }

  ngOnInit() {
    //this.loadMap2();
    this.checkGPSPermission();
    this.festival = sessionStorage.getItem('festival')
    this.festival = JSON.parse(this.festival)
    
    console.log('Esta es la varisbles para mostar: ', this.festival)
    this.destino.lat = parseFloat(this.festival.latitud_evento);
    this.destino.lng = parseFloat(this.festival.longitud_evento);
    console.log('Esta es el destino: ', this.destino)
  }
  ngAfterViewInit(): void {
    this.loadMap2();
  }
  goBack() {
    this.route.navigate(['/profile'])
  }
///////////////////////////////////////INICIO DE PRUEBA!!
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
         //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
   
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
            // call method to turn on GPS
              this.askToTurnOnGPS();
              },
              error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
              }
          );
        }
      });
  }
   
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates();
        //this.getUserLocation();
        //this.getGeo();
      },
      async error => {
        
        const toast = await this.toastController.create({
          message: 'Debe aceptar el permiso para continuar!',
          duration: 3000
        });
        toast.present();
        this.goBack();
        //alert('Acepte el permiso para continuar ' + JSON.stringify(error))
      }
    );
  }
   
    // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      console.log('Esta es el ORIGEN: ', this.locationCoords);
  }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
///////////////////////////////////////FIN DE PRUEBA!!!
  async loadMap2() {
    //const loading = await this.loadingCtrl.create();
    //loading.present();
    this.myLatLng = await this.getLocation();
    console.log("Mi ubicacion!:",  this.myLatLng )
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 12
    });
    console.log("MAPA 8");
    const that = this;
    this.directionsDisplay.setMap(this.mapRef);
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
        this.addMaker(this.myLatLng.lat, this.myLatLng.lng);
        //this.addMaker(this.origen.lat, this.origen.lng);
        this.addMaker(this.destino.lat, this.destino.lng);
    });
    this.calcular();

  }

  calcular(){
    const that = this;
    console.log('ORIGEN: ', this.myLatLng)
    console.log('DESTINO ', this.destino)
    this.directionsService.route({
      //origin: this.origen,
      origin: this.myLatLng,
      destination: this.destino,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        that.directionsDisplay.setDirections(response);
        //window.alert('Reconocio la solicitud ' + status);
      } else {
        window.alert('No se pudo obtener la ruta! ' + status);
      }
    });
  }
  
  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: 'Hello World!'
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

}
