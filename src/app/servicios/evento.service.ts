import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';
import 'rxjs/Rx';
import { formatDate } from '@angular/common';
import { reject } from 'q';
//import {LogService} from './log.service'

@Injectable({
  providedIn: 'root',
})

export class EventoService {
  private snapshotChangesSubscription: any;

  private dbPath = '/evento';
  
  eventoRef: AngularFireList<{
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
  }> = null;
  
  constructor(public afs: AngularFirestore,
    private storage: AngularFireStorage, private db: AngularFireDatabase) {
    this.eventoRef = db.list(this.dbPath);
  }
  
  createEvento (data:any) {
    return this.eventoRef.push(data);
  }


  listarAllEvents () {
    return this.eventoRef;
  }


  listarAllEventsByIdUsuario (id_usuario: any): AngularFireList<any> {
    return this.db.list('/evento', ref => ref.orderByChild('id_usuario').equalTo(id_usuario))
  }

  updateEvento (key: string, value: any): Promise<void>  {
    return this.eventoRef.update(key, value);
  }

  getEventoByKey(key): AngularFireList<any> {
    return this.db.list('/evento', ref => ref.orderByKey().equalTo(key))
  }


  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }


  /*
  createCustomer(): void {

    var hlp = {
      name: 'Fer',
      age: 34
    }

    console.log('Si entro hasta aca')
    this.customersRef.push(hlp);
  }
  
  getCustomersList(): AngularFireList<any> {
    return this.customersRef;
  }

  getCustomerById(): AngularFireList<any> {
    return this.db.list('/customers', ref => ref.orderByChild('age').equalTo(34))
  }

  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }
  
  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }

  */





}

