import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: any [] = [];
  public usuarioBorrar = {
    id:String,
    nombre: String
  };


  constructor(
    private userService: UsersService,
    private router:Router
    ) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.userService.listar().toPromise().then(data =>{
      console.log(data);
      this.users = data.Usuarios;
      console.log(this.users)
    }).catch(err => {
      console.log('error', err);
    });
  }

  editar(id) {
    this.router.navigate(['/users/edit/' + id]);
  }

  borrar(id) {
    this.userService.deleteUser(id).toPromise().then(data => {
      console.log('data',data);
      this.listarUsuarios();
    }).catch(err => {
      console.log('error', err);
    })
  }

  idBorrar(user){
    console.log(user);
    
    this.usuarioBorrar.id = user._id;
    this.usuarioBorrar.nombre = user.name;
  }

}
