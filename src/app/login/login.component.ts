import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../api-rest.service';
import { ToastrService } from 'ngx-toastr';
import { fadeInOut } from '../fade.animation';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInOut]
})
export class LoginComponent {
  email: string = ""
  pass = ""
  ShowError = false
  ShowLoadig = false

  constructor(private router: Router,
     private api: ApiRestService,
     private msg:ToastrService,
     private spinner:NgxSpinnerService
     ) { }
  login(){
    this.ShowLoadig=true
    this.api.login(this.email,this.pass).subscribe({
      next: (respuesta:any) => {
        this.msg.success("bienvenido al foro")
        localStorage.setItem("correo",this.email);
        localStorage.setItem('idToken',respuesta.idToken) // Guarda el idToken en el almacenamiento local
        console.log(respuesta)
        console.log(localStorage.getItem('idToken'))
        this.spinner.show
        setTimeout(() => {
          // Simulando una solicitud HTTP que tarda 2 segundos
          this.spinner.hide();
          this.router.navigate(['/home'])
        }, 2000);

      },
      error: respuesta => {
        this.msg.error("Error en el usuario o contraseña ")
        this.ShowLoadig=false
        this.ShowError=true
      },

    } )

  }
}
