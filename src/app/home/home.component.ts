import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  preguntas = [
    {no: 1, asunto:"", carreras:"",descripcion:"", foto:"", icono:"", relevancia:"",id:""},
  ]
  newP={carreras:"", pregunta:"",relevancia:"",asunto:"",descripcion:""}
  modP = {categoria:"", descripcion:"", id:""}
  fileName: string = "";
  selectedFile: File | null = null;

  constructor(private api: ApiRestService,private msg:ToastrService){}

    ngOnInit():void{
      this.consultaImg()

    }
    onFileSelected(event: any): void {
      // Actualiza el nombre del archivo seleccionado
      this.selectedFile = event.target.files ? event.target.files[0] : null;
      if(this.selectedFile)
      this.fileName = this.selectedFile?.name.split('.').slice(0, -1).join('.');
    console.log(this.fileName)
    }

    uploadFile(): void {
      if (!this.selectedFile || this.newP.carreras.length===0
        || this.newP.asunto.length===0 || this.newP.descripcion.length===0
        || this.newP.relevancia.length===0) {
        console.error('No se ha llenado alguún campo');
        this.msg.show('No se ha llenado alguún campo');
        return;
      }
      // const filename: string = this.fileName || 'nombre-archivo'; Puedes usar el nombre proporcionado o uno predeterminado
      this.api.uploadImage(this.fileName, this.selectedFile).subscribe(response => {
        console.log('Respuesta del servidor:', response);
        console.log(this.newP.relevancia);
      });
      if(this.newP.relevancia == "importante"){
        this.api.createAd(this.newP.asunto,this.newP.carreras,this.newP.descripcion,
        this.fileName,this.newP.relevancia,
        this.newP.relevancia).subscribe({ next:response => {
          console.log('entro aqui', response);
          this.consultaImg();
        }, error: response =>{
          console.log(this.newP.asunto,this.newP.carreras,this.newP.descripcion,
            this.newP.relevancia);
          console.log('hubo un error', response);
        }
        });
      }else if(this.newP.relevancia == "medio"){
        this.api.createAd(this.newP.asunto,this.newP.carreras,this.newP.descripcion,
        this.fileName,this.newP.relevancia,
        this.newP.relevancia).subscribe(response => {
          console.log('Respuesta del servidor:', response);
          this.consultaImg();
        });
      }else{
        this.api.createAd(this.newP.asunto,this.newP.carreras,this.newP.descripcion,
        this.fileName,this.newP.relevancia,
        this.newP.relevancia).subscribe(response => {
          console.log('Respuesta del servidor:', response);
          this.consultaImg()
        });
      }

    }
    /*onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      const filename: string = 'nombre-archivo';  // Reemplaza 'nombre-archivo' con el nombre que desees

      // Llama a tu método uploadImage con los parámetros necesarios
      this.api.uploadImage(filename, file).subscribe(response => {
        console.log('Respuesta del servidor:', response);
      });
    }*/
    consultaImg(){
      this.api.getAllAnuncios().subscribe({
        next: datos => {
          console.log(datos.documents[3])
          let i=1;
          const documents = datos.documents.filter((p:any) => p.hasOwnProperty("fields"))
          this.preguntas= documents.map((p: {name:string,fields:any}) =>({
            no: i++,
            asunto: p.fields.hasOwnProperty('asunto')? p.fields.asunto.stringValue : "",
            carreras:  p.fields.hasOwnProperty('carreras')? p.fields.carreras.stringValue : "",
            descripcion:  p.fields.hasOwnProperty('descripcion')? p.fields.descripcion.stringValue : "",
            foto:  p.fields.hasOwnProperty('foto')? p.fields.foto.stringValue :"",
            icono:  p.fields.hasOwnProperty('icono')? p.fields.icono.stringValue : "",
            relevancia:  p.fields.hasOwnProperty('relevancia')? p.fields.relevancia.stringValue : "",
            id: p.name.split("/").pop()
          }))
          console.log(this.preguntas)
        },
        error: e => {}
      })
    }
  /*consulta(){
    this.api.getAllPreguntas().subscribe({
      next: datos => {
        console.log(datos.documents[3])
        let i=1;
        const documents = datos.documents.filter((p:any) => p.hasOwnProperty("fields"))
        this.preguntas= documents.map((p: {name:string,fields:any}) =>({
          no: i++,
          pregunta: p.fields.hasOwnProperty('pregunta')? p.fields.pregunta.stringValue : "",
          categoria:  p.fields.hasOwnProperty('categoria')? p.fields.categoria.stringValue : "",
          correo:  p.fields.hasOwnProperty('correo')? p.fields.correo.stringValue : "",
          fecha:  p.fields.hasOwnProperty('fecha')? p.fields.fecha.timestampValue : "",
          id: p.name.split("/").pop()
        }))
        console.log(this.preguntas)
      },
      error: e => {}
    })
  }*/

  /*crearPregunta(){
    const correo = localStorage.getItem("correo") ||""
    const fecha= new Date().toISOString();
    if(this.newP.carreras=="" || this.newP.pregunta=="" ){
      alert("Debes de escribir la pregunta y seleccionar la categoria");
      return;
    }
    this.api.createPregunta(this.newP.carreras, correo, this.newP.pregunta, fecha).subscribe({
      next: resp=> {this.consulta()},
      error:e=>{console.log(e)}
    })
  }*/
  borrarAnuncio(id:string,foto:string){
    foto = foto.split('.').slice(0, -1).join('.');
    this.api.deleteAnuncio(id).subscribe({
      next:resp=> {this.consultaImg()},
      error: e=>{console.log(e)
      console.log(id)}
    })
    this.api.deleteImage(foto).subscribe({
      next:resp=> {this.consultaImg()},
      error: e=>{console.log(e)
      console.log(foto)}
    })
  }

 /* borrarPregunta(id:string){
    this.api.deletePregunta(id).subscribe({
      next:resp=> {this.consultaImg()},
      error: e=>{console.log(e)}
    })
  }*/
  modificarPregunta(){
    this.api.updateAnuncio(this.modP.descripcion, this.modP.id).subscribe({
      next:resp=> {this.consultaImg()},
      error: e=>{console.log(e)}
    })
  }
  editarPregunta(p:any){
    this.modP=JSON.parse(JSON.stringify(p));
  }
}
