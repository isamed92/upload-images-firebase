import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  constructor() {}

  @Input() archivos: FileItem[] = [];
  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseHover.emit(true);
    this._prevenirDetener(event);

  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseHover.emit(false);
  }
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia =  this._getTransferencia(event);
    if(!transferencia) {
      return;
    }
    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseHover.emit(false);



  }

  //extender la compatibilidad para todos los navegadores
  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer: event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {
    // console.log(archivosLista);
    for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
      const archivoTemporal = archivosLista[propiedad];
      if(this._archivoPuedeSerCargado(archivoTemporal)){
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }

    console.log(this.archivos);
  }

  // validaciones
  private _archivoPuedeSerCargado(archivo: File) : boolean {
    if(!this._archivoYaFueDropeado(archivo.name) && this._isImage(archivo.type)){
      return true;
    }
    else return false;

  }

  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaFueDropeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('el archivo', nombreArchivo, ' ya esta agregado');
        return true;
      }
      return false;
    }
  }

  private _isImage(tipoArchivo: string): boolean {
    return tipoArchivo === '' || tipoArchivo === undefined
      ? false
      : tipoArchivo.startsWith('image');
  }
}
