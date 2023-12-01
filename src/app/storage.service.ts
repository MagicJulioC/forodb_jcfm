import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageRestService {
  baseUrl = 'https://firebasestorage.googleapis.com/v0/b/prueba-test-84de1/o/';

  constructor(private http: HttpClient) {}

  // Obtener un objeto
  getObject(objectName: string, idToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.get(this.baseUrl + encodeURIComponent(objectName), {headers: headers});
  }

  // Subir un objeto
  uploadObject(objectName: string, objectData: any, idToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.post(this.baseUrl + encodeURIComponent(objectName), objectData, {headers: headers});
  }

  // Actualizar un objeto
  updateObject(objectName: string, objectData: any, idToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.put(this.baseUrl + encodeURIComponent(objectName), objectData, {headers: headers});
  }

  // Eliminar un objeto
  deleteObject(objectName: string, idToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    return this.http.delete(this.baseUrl + encodeURIComponent(objectName), {headers: headers});
  }
}
