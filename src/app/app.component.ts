import { Component } from '@angular/core';
interface Photo {
  nombre:string;
  id:string;
  url: string;
  tags: string;
  height?: string; // Altura opcional
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unsplash';
  datosRecibidos: Photo[] = [];
  estado: boolean = false;
  id: string = "";
  showComponent: boolean = true

  recibirDatos(datos: Photo[]) {
    this.datosRecibidos = datos;
  }
  recibirid(id: string){
     this.id = id;
     this.estado = !this.estado
     console.log(this.estado);
  }
  modelestado(){
    this.estado = false
  }
  updateComponent() {
    // Actualizar los datos del componente
  
    this.showComponent = false

    setTimeout(() => {
      this.showComponent = true;
    }, 0);
  }
}
