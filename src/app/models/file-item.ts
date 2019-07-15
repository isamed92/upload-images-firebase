

export class FileItem {


    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public isUploading: boolean;
    public progress: number;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;
        this.isUploading = false;
        this.progress = 0;
    }

}