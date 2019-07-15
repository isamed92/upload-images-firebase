import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  isOnDrop: boolean = false;

  constructor(public servicio: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this.servicio.cargarImagenesFirebase(this.archivos);

  }

  pruebaSobreElemento(event) {
    console.log(event);

  }

}
