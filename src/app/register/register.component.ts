import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';
import { pulse,fadeInOut } from '../fade.animation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations:[pulse,fadeInOut]
})
export class RegisterComponent {
  email: string = ""
  pass = ""
  pass2 = ""
  ShowError = false
  ShowLoadig = false
  val=false
  amaterno:string	=""
  apaterno:string	=""
  grupo:string	=""
  nombre:string	=""
  numControl:string	=""

  constructor(private router: Router, private api: ApiRestService,
    private msg:ToastrService) { }

  register():void{
    if(!(this.amaterno.length===0 || this.apaterno.length===0 || this.email.length===0,
      this.grupo.length===0 || this.nombre.length===0 || this.numControl.length===0)){

        this.ShowLoadig=true
        this.msg.success("Registro exitoso")
        this.api.register(this.email,this.pass).subscribe({
          next: respuesta => {
            this.api.createUser(this.amaterno,this.apaterno,this.email,this.grupo,this.nombre,this.numControl).subscribe({
              next:res =>{
                console.log(res)
              },error: errorts =>{
                console.log(errorts)
              }
            })
            this.router.navigate(['/home'])
          },
          error: problemilla => {
            this.ShowLoadig=false
            this.ShowError=true
          },
        } )
      }else{
    console.log(this.amaterno,this.apaterno,this.email,this.grupo,this.nombre,this.numControl)
    this.msg.error("Faltan campos por llenar")
  }
}
}
