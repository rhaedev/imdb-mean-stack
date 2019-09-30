import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public createForm: FormGroup;
  public create = false;
  public message:String;
  public errores:boolean = false;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nick: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
    this.userService.createUser(this.createForm.value).toPromise().then( resp => {
      console.log('respuesta', resp);
      this.create = true;
      this.errores = false;
      setTimeout(() => {
        this.create = false;
      }, 4000);
      this.router.navigate(['/users/list']);
    }).catch( error => {
      this.errores = true;
      console.log('error', error);
      this.message = JSON.stringify(error.error.err.errors);
    })
  }

}
