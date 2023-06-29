import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private http: HttpClient) { }

  obtenerDatosDeAPI(): Observable<any> {
    const url = 'https://fastapi-i0h2.onrender.com/imagenes'; // Reemplaza con la URL de tu API

    return this.http.get<any>(url);
  }
  sendData(image: File, tags: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('tags', tags); 
  
    return this.http.post('https://fastapi-i0h2.onrender.com/unsplash', formData);
  }
  eliminar(id:  any){
    return this.http.delete('https://fastapi-i0h2.onrender.com/eliminar/'+ id.toString());
  }
}
