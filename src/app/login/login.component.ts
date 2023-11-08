import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  pass = ""
  ShowError = false
  ShowLoadig = false

  constructor(private router: Router,
     private api: ApiRestService,
     private msg:ToastrService
     ) { }
  login(){
    this.ShowLoadig=true
    this.api.login(this.email,this.pass).subscribe({
      next: respuesta => {
        this.msg.success("bienvenido al foro")
        localStorage.setItem("correo",this.email);
        this.router.navigate(['/home'])
      },
      error: respuesta => {
        this.msg.error("Error en el usuario o contraseña ")
        this.ShowLoadig=false
        this.ShowError=true
      },
  
    } )
   
  }
}
