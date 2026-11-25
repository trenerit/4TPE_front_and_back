import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/userInterface';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  protected tabUsers: Array<User> = [];

  protected error = false;

  constructor(private usersService: UsersService) {}
   
  ngOnInit(): void {
   this.getUsers();
  }

  // getUsers() {
  //   this.usersService.getUsers().subscribe(data => {
  //     console.log(data);
  //     this.tabUsers = data;
  //   })
  // }
  
  getUsers() {
    this.usersService.getUsers().subscribe({
      // next - wtedy, kiedy serwer "odpowiada"
      next: data => {
        console.log(data);
        this.tabUsers = data;
        if(this.tabUsers.length === 0) {
          this.error = true;
        }
      },
      // error - wtedy, kiedy serwer nie ma end-pointa
      error: err => {
        console.log('error', err.status)
      },
      // działa tylko z next
      complete: () => {
        console.log('complete');
      }
    })
  }

}