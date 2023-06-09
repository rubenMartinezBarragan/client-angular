import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInEnterComponent } from 'src/app/sign-in/sign-in-enter/sign-in-enter.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  signIn() {    
    const dialogRef = this.dialog.open(SignInEnterComponent, {
      data: {}
    });    
  }  
}
