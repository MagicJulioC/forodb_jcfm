import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  urlLogin = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBSD3Kea8r4su9O4b3H5Sr6o4KeUwsmps";
  urlRegister = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBSD3Kea8r4su9O4b3H5Sr6o4KeUwsmps";
  url = "https://firestore.googleapis.com/v1/projects/infomraitsch/databases/(default)/documents/"
  urlImages = "https://firebasestorage.googleapis.com/v0/b/infomraitsch.appspot.com/o/images%2f"
  urlIconos = "https://firebasestorage.googleapis.com/v0/b/infomraitsch.appspot.com/o/iconos%2f"
  urlStorage = "https://firebasestorage.googleapis.com/v0/b/infomraitsch.appspot.com/o/"

  constructor(private http: HttpClient) { }
  // Métodos de Storage para subir, descargar y Eliminar imagenes
  uploadImage(filename: string, file: File){
    const form = new FormData();
    form.append("file", file)
    return this.http.post(this.urlImages + filename, form)
  }

  downloadImage(filename: string){
    return this.http.get(this.urlStorage + filename + "?alt=media")
  }

  deleteImage(filename: string){
    return this.http.delete(this.urlImages + filename + "?alt=media")
  }

  getAllAnuncios(){
    return this.http.get<any>(this.url + "Anuncios?pageSize=100")
  }
  deleteAnuncio(id:string){
    return this.http.delete(this.url + "Anuncios/"+id)
  }
  updateAnuncio(descripcion:string, id:string ){
    const newDoc = {
      fields:{
        descripcion:{stringValue:descripcion},
      }
    }
    return this.http.patch(this.url + "Anuncios/"+id+"?updateMask.fieldPaths=descripcion", newDoc)
  }
  createAd(asunto:string, carreras:string, descripcion:string, foto:string, icono:string, relevancia:string ){
    const newDoc = {
     fields:{
       asunto:{stringValue:asunto},
       carreras:{stringValue:carreras},
       descripcion:{stringValue:descripcion},
       foto:{stringValue:this.urlImages+foto},
       icono:{stringValue:this.urlIconos + icono + ".png"},
       relevancia:{stringValue:relevancia}
     }
    }
     return this.http.post(this.url + "Anuncios", newDoc)
   }
// Método de Login

  login(email: string, pass: string){
    return this.http.post(this.urlLogin, {email:email,password:pass,returnSecureToken:true})
  }
  register(email: string, pass: string){
    return this.http.post(this.urlRegister, {email:email,password:pass,returnSecureToken:true})
  }

//Igresar información en el la coleccion de Usuarios
createUser(amaterno:string,
  apaterno:string,
  correo:string,
  grupo:string,
  nombre:string,
  numControl:string){
  const newDoc = {
   fields:{
    amaterno:{stringValue:amaterno},
    apaterno:{stringValue:apaterno},
    correo:{stringValue:correo},
    grupo:{stringValue:grupo},
    nombre:{stringValue:nombre},
    numControl:{stringValue:numControl}
   }
  }
   return this.http.post(this.url + "usuarios", newDoc)
 }

  /*getAllPreguntas(){
    return this.http.get<any>(this.url + "preguntas?pageSize=100")
  }
  createPregunta(categoria:string, correo:string, pregunta:string, fecha:string){
   const newDoc = {
    fields:{
      correo:{stringValue:correo},
      categoria:{stringValue:categoria},
      pregunta:{stringValue:pregunta},
      fecha:{timestampValue:fecha}
    }
   }
    return this.http.post(this.url + "preguntas", newDoc)
  }
  updatePregunta( pregunta:string, id:string ){
    const newDoc = {
      fields:{
        pregunta:{stringValue:pregunta},
      }
    }
    return this.http.patch(this.url + "preguntas/"+id+"?updateMask.fieldPaths=pregunta", newDoc)
  }
  deletePregunta(id:string){
    return this.http.delete(this.url + "preguntas/"+id)
  }*/
}
