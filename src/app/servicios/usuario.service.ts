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

export class UserService {
  private snapshotChangesSubscription: any;

  private dbPath = '/usuario';
  
  usuarioRef: AngularFireList<{
    nombre_apellido: String,
    correo_electronico: String,
    password: String,
    codigo_qr: String
  }> = null;
  
  constructor(public afs: AngularFirestore,
    private storage: AngularFireStorage, private db: AngularFireDatabase) {
    this.usuarioRef = db.list(this.dbPath);
  }
  
  createUsuario (data:any) {
    return this.usuarioRef.push(data);
  }

  loginUsuario (data: any): AngularFireList<any> {
    return this.db.list('/usuario', ref => ref.orderByChild('correo_electronico').equalTo(data.correo_electronico))
  }
  
  getUsuarioByKey(key): AngularFireList<any> {
    return this.db.list('/usuario', ref => ref.orderByKey().equalTo(key))
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

