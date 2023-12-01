import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';
import { pulse,fadeInOut } from '../fade.animation';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  animations:[,pulse,fadeInOut]
})
export class CategoriaComponent {
  preguntas = [
    {no: 1, asunto:"", carreras:"",descripcion:"", foto:"", icono:"", relevancia:"",id:""},
  ]
  newP={carreras:"", pregunta:"",relevancia:"",asunto:"",descripcion:""}
  modP = {categoria:"", descripcion:"", id:""}
  fileName: string = "";
  selectedFile: File | null = null;
  constructor(private api: ApiRestService,private msg:ToastrService ){}
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
        this.msg.success("Se ha agregado el anuncio correctamente")
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

modificarPregunta(){
  this.api.updateAnuncio(this.modP.descripcion, this.modP.id).subscribe({
    next:resp=> {this.consultaImg()},
    error: e=>{console.log(e)}
  })

}
}
