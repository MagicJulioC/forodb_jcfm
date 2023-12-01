import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { pulse,fadeInOut } from '../fade.animation';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  animations:[pulse,fadeInOut]
})
export class ContactoComponent {

  constructor(private msg:ToastrService) { }
  envioMsg(){
    this.msg.success("Se ha enviado el mensaje")
  }
}
