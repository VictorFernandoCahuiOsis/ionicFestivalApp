import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../servicios/evento.service'
import { ToastController } from '@ionic/angular';
import * as moment from 'moment'

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-crear-festival',
  templateUrl: './crear-festival.page.html',
  styleUrls: ['./crear-festival.page.scss'],
})

export class CrearFestivalPage implements OnInit {

  locationCoords: any;
  timetest: any;;


  fechaInicio: any
  fechaFin: any


  evento: any = {
    nombre_evento: String,
    capacidad_total: Number,
    asistentes: Number,
    latitud_evento: String,
    longitud_evento: String,
    fecha_inicio: String,
    fecha_fin: String,
    url_imagen: String,
    descripcion: String,
    id_usuario: String
  }

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private route: Router, private eventoService: EventoService, private platform: Platform,
              private toastController: ToastController, private geolocation: Geolocation,
              private androidPermissions: AndroidPermissions,
              private locationAccuracy: LocationAccuracy,
              private loadingCtrl: LoadingController,
              private camera: Camera, private file: File, private crop: Crop,
              public actionSheetController: ActionSheetController) {
    this.evento.nombre_evento = ''
    this.evento.descripcion = ''
    this.evento.capacidad_total = ''
    this.evento.fecha_inicio = ''
    this.evento.fecha_fin = ''
    this.evento.asistentes = 0
    this.evento.latitud_evento = 0
    this.evento.longitud_evento =0
    //this.evento.url_imagen = 'https://firebasestorage.googleapis.com/v0/b/plataformaseme.appspot.com/o/festival1.png?alt=media&token=c5d18a51-0590-4266-b0fc-ac1ac15a63cc'
    this.evento.url_imagen = ''
    this.evento.id_usuario = sessionStorage.getItem('id_usuario')

    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timetest = Date.now();

    this.fechaInicio = new Date()
    this.fechaFin =  new Date()
    
   }

  ngOnInit() {
    this.checkGPSPermission()
  }

  goBack() {
    this.route.navigate(['/profile'])
  }

  async crearEvento() {
    //this.getGeo()
    //const loading = document.createElement('ion-loading');
    //loading.spinner = null;
    //loading.duration = 5000;
    //loading.message = 'Creando evento...';
    //loading.translucent = true;
    //loading.cssClass = 'custom-class custom-loading';
    //document.body.appendChild(loading);
    const loading =  await this.loadingCtrl.create({
      spinner: null,
      //duration: 5000,
      message: 'Creando evento...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    loading.present();

    this.evento.fecha_inicio =  new Date(this.fechaInicio).getTime()
    this.evento.fecha_fin = new Date(this.fechaFin).getTime()
    
    console.log('EStos son los datos que guardare: ', this.evento)
    
    this.eventoService.createEvento(this.evento).then(async response => {
      
      console.log('Esta es el response: ', response)

      loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Se creo el evento!',
        duration: 2000
      });
      
      toast.present();
      this.route.navigate(['/profile'])
    }, error => {
      loading.dismiss();
      console.log('Este es el error: ', error)
    })
    
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Seleccione fuente de imagen",
      buttons: [{
        text: 'Buscar en galeria',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Tomar una foto',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('No se cargo la imagen' /*+ error*/);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      console.log(base64);
      //alert(base64);
      //alert(imageName);
      //alert(filePath);
      this.evento.url_imagen = base64;
      this.isLoading = false;
    }, error => {
      alert('Hubo un error recortando la imagen' /*+ error*/);
      this.isLoading = false;
    });
  }

  //Check if application having GPS access permission  
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
      this.evento.latitud_evento = resp.coords.latitude;
      this.evento.longitud_evento = resp.coords.longitude;
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      const coords = `${ resp.coords.latitude },${ resp.coords.longitude },${ resp.coords.accuracy },${ resp.timestamp }`;
      //alert('cordenadas:'+coords);
      console.log(coords);

    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }
  
  


}
