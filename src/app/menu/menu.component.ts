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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() modalOpen = false;
  imagen!: File;
  tags!: string;
  nombreimg: string = "";
  tagss: string[] = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
  searchTerm: string = '';
  searchResults: Photo[] = [];
  pass!: string
  photos: Photo[] = [];
  @Input() id: string = "";
  @Input() estado: boolean = false;
  @Output() datosEnviados = new EventEmitter<Photo[]>();
  @Output() cestado = new EventEmitter<any>();
  @Output() recargar = new EventEmitter<any>();
  
  constructor (private service: ImagenesService){}


  ngOnInit() {
    this.obtenerDatosDesdeAPI();
      }
    obtenerDatosDesdeAPI() {
        this.service.obtenerDatosDeAPI().subscribe(
          (response) => {
            this.photos = response;
          },
          (error) => {
            console.error('Error al obtener los datos de la API:', error);
          }
        );
        
      }
    openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.nombreimg = "";
    this.estado = false
    this.cestado.emit();
  }
  onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.imagen = file
    this.nombreimg = file.name
  }
  submitForm(event: Event) {
    event.preventDefault();
    this.service.sendData(this.imagen, this.tags).subscribe(
      response => {
        // Lógica después de enviar exitosamente los datos
        console.log('Datos enviados correctamente', response);
        this.modalOpen = false
        this.recargar.emit();
      },
      error => {
        // Lógica en caso de error al enviar los datos
        console.error('Error al enviar los datos', error);
      }
    );

  }
  submitDelete(event: Event){
    event.preventDefault();
    if (this.pass === 'password') {
      this.service.eliminar(this.id).subscribe(
        response => {
          // Lógica después de enviar exitosamente los datos
          console.log('Eliminado correctamente', response);
          this.estado = false
          this.modalOpen = false
          this.recargar.emit();
        },
        error => {
          // Lógica en caso de error al enviar los datos
          console.error('Error al eliminar', error);
        }
      );
    } else {
      
    }
  }

  search() {
    // Limpiar resultados anteriores
    this.searchResults = [];
    this.datosEnviados.emit(this.searchResults);
     // Si el término de búsqueda está vacío, no mostrar resultados
     // Cuando se aplica trim() a una cadena de texto, se crea una nueva cadena en la que se eliminan los espacios en blanco al comienzo y al final. La cadena original no se modifica.
     
     if (this.searchTerm.trim() === '') {
      return;
    }

    // Buscar etiquetas que coincidan con cada letra ingresada
    for (let item of this.photos) {
      for (let tag of item.tags) {
        if (tag.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          this.searchResults.push(item);
          this.datosEnviados.emit(this.searchResults);
          break; // Si se encuentra una etiqueta coincidente, se sale del bucle interno
        }
      }
    }
  }

 
 
}
