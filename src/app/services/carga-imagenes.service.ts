import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) {}

  private guardarImage(imagen: { nombre: string; url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    // console.log(imagenes);
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
      item.isUploading = true;
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
        .put(item.archivo);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          item.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => console.error('error al subir', error),
        () => {
          console.log('Imagen cargada correctamente');
          // item.url = uploadTask.snapshot.downloadURL;
          // item.isUploading = false;
          // this.guardarImage({ nombre: item.nombreArchivo, url: item.url });
          uploadTask.snapshot.ref.getDownloadURL().then(
            (onfullfilled: any) => {
              console.log('(promise) the download is:', onfullfilled);
              item.url = onfullfilled;
              console.log(item.url);
              item.isUploading = false;
              this.guardarImage({
                nombre: item.nombreArchivo,
                url: item.url
              });
            },
            (onrejected: any) => {
              console.log('(promise) the download url has been rejected');
            }
          );
        }
      );
    }
  }
}
