import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content/user-content.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserContentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
  ]
})
export class UsersModule { }
