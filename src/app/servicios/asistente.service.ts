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

export class AsistenteService {
  private snapshotChangesSubscription: any;

  private dbPath = '/asistente';
  
  eventoRef: AngularFireList<{
    nombre_usuario: String,
    id_evento: Number,
  }> = null;
  
  constructor(public afs: AngularFirestore,
    private storage: AngularFireStorage, private db: AngularFireDatabase) {
    this.eventoRef = db.list(this.dbPath);
  }
  
  createAsistencia (data:any) {
    return this.eventoRef.push(data);
  }
  
  listarAllAsistencia () {
    return this.eventoRef;
  }

  listarByIdEvento (id_evento: any) {
    return this.db.list('/asistente', ref => ref.orderByChild('id_evento').equalTo(id_evento))
  }

  




}

