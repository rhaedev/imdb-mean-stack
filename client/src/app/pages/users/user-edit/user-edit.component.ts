import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public editForm: FormGroup;
  public create = false;
  public message: string;
  public errores: boolean = false;
  public idUser: string;

  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nick: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    this.getUser();
  }

  getUser() {
    this.route.params.subscribe(resp => {
      this.idUser = resp.id;
      console.log(this.idUser);
      this.userService.getUser(this.idUser).toPromise().then((usuario: any) => {
        this.rellenarFormulario(usuario);
      }).catch(err => {
        console.log('error', err);
      });
    });
  }

  rellenarFormulario(user) {
    console.log(user.Usuario);
    let userEdit = user.Usuario;
    console.log(userEdit.name);

    this.editForm = new FormGroup({
      name: new FormControl(userEdit.name, [Validators.required, Validators.minLength(3)]),
      nick: new FormControl(userEdit.nick, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      email: new FormControl(userEdit.email, [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value, this.idUser).toPromise().then(resp => {
      console.log('respuesta', resp);
      this.create = true;
      this.errores = false;
      console.log('password', this.editForm.controls.pass.value);
      
      if ((this.editForm.controls.pass.value.length) > 0) {
        //if (this.editForm.controls.pass.value === this.editForm.controls.pass2.value) {
          this.userService.updateUserPass(this.editForm.controls.pass.value, this.idUser).toPromise().then(pass => {
            console.log('pass', pass);
          }).catch( error => {
            console.log('Error Password', error);
          });
        //}
      }
      setTimeout(() => {
        this.create = false;
      }, 4000);
      this.router.navigate(['/users/list']);
    }).catch(error => {
      this.errores = true;
      console.log('error', error);
      this.message = JSON.stringify(error.error.err.errors);
    })
  }


}
