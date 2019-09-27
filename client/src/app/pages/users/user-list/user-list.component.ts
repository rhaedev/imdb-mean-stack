import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: any [] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.listar().toPromise().then(data =>{
      console.log(data);
      this.users = data.users;
    }).catch(err => {
      console.log('error', err);
      
    });
  }

}
