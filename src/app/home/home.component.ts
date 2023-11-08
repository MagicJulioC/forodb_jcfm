import { Component } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  preguntas = [
    {no: 1, pregunta:'¿Cuál es la capital de Francia?', categoria:"",correo:"", fecha:"", id:""},

  ]
  newP={categoria:"", pregunta:""}
  modP = {categoria:"", pregunta:"", id:""}

  constructor(private api: ApiRestService){}

    ngOnInit():void{
      this.consulta()
    }

  consulta(){
    this.api.getAllPreguntas().subscribe({
      next: datos => {
        console.log(datos.documents[3])
        let i=1;
        const documents = datos.documents.filter((p:any) => p.hasOwnProperty("fields"))
        this.preguntas= documents.map((p: {name:string,fields:any}) =>({
          no: i++,
          pregunta: p.fields.hasOwnProperty('pregunta')? p.fields.pregunta.stringValue : "",
          categoria:  p.fields.hasOwnProperty('categoria')? p.fields.pregunta.stringValue : "",
          correo:  p.fields.hasOwnProperty('correo')? p.fields.correo.stringValue : "",
          fecha:  p.fields.hasOwnProperty('fecha')? p.fields.pregunta.timestampValue : "",
          id: p.name.split("/").pop()
        }))
        console.log(this.preguntas)
      },
      error: e => {}
    })
  }

  crearPregunta(){
    const correo = localStorage.getItem("correo") ||""
    const fecha= new Date().toISOString();
    if(this.newP.categoria=="" || this.newP.pregunta=="" ){
      alert("Debes de escribir la pregunta y seleccionar la categoria");
      return;
    }
    this.api.createPregunta(this.newP.categoria, correo, this.newP.pregunta, fecha).subscribe({
      next: resp=> {this.consulta()},
      error:e=>{console.log(e)}
    })
  }
  borrarPregunta(id:string){
    this.api.deletePregunta(id).subscribe({
      next:resp=> {this.consulta()},
      error: e=>{console.log(e)}
    })
  }
  modificarPregunta(){
    this.api.updatePregunta(this.modP.pregunta, this.modP.id).subscribe({
      next:resp=> {this.consulta()},
      error: e=>{console.log(e)}
    })
  }
  editarPregunta(p:any){
    this.modP=JSON.parse(JSON.stringify(p));
  }
}
