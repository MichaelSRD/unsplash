import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImagenesService } from '../imagenes.service';

interface Photo {
  nombre: string;
  id:string;
  url: string;
  tags: string;
  height?: string; // Altura opcional
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  @Input() datosRecibidos: Photo[] = [];
  photos: Photo[] = []
  reversedArray: Photo[] = []
  @Output() enviarid = new EventEmitter<string>();
  constructor(private servicio: ImagenesService){}

  ngOnInit() {
    this.obtenerDatosDesdeAPI();
      }
  obtenerDatosDesdeAPI() {
    this.servicio.obtenerDatosDeAPI().subscribe(
      (response) => {
        this.reversedArray = response;
        this.photos = this.reversedArray.reverse();
        this.setRandomHeights();
      },
      (error) => {
        console.error('Error al obtener los datos de la API:', error);
      }
    );
    
  }

  setRandomHeights() {
    const heights = [
      '200px', '300px', '400px','30.40494rem','287.11px','306.29px'
    ];

    this.photos.forEach(photo => {
      const randomHeight = heights[Math.floor(Math.random() * heights.length)];
      photo.height = randomHeight;
    });
  }

  eliminar(id: string){
    this.enviarid.emit(id);
  }

  
}
