import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//si sale error ejecuten esto
//$ ionic cordova plugin add cordova-plugin-qrscanner
//$ npm install --save @ionic-native/qr-scanner
//import { QRScanner } from '@ionic-native/qr-scanner/ngx';

/*
import {AngularFireModule} from 'angularfire2'
import {AngularFirestoreModule} from 'angularfire2/firestore'
*/
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database'

import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
		AngularFireDatabaseModule,
  ],
  providers: [
    //QRScanner,
   
    Camera,
    File,
    Crop,
    AngularFirestore,
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
