import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignInService } from '../sign-in.service';
import { SignIn } from '../model/Sign-in';

@Component({
  selector: 'app-sign-in-enter',
  templateUrl: './sign-in-enter.component.html',
  styleUrls: ['./sign-in-enter.component.scss']
})
export class SignInEnterComponent implements OnInit {
  signIn : SignIn;
  errorMessage = "";

  constructor(
    public dialogRef: MatDialogRef<SignInEnterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private signInService: SignInService
  ) { }

  ngOnInit(): void {
    if (this.data.singIn != null) {
      this.signIn = Object.assign({}, this.data.singIn);
    }
    else {
      this.signIn = new SignIn();
    }
  }

  onEnter() {
    console.log('User: ' + this.signIn.user);
    console.log('Password: ' + this.signIn.password);
    
    this.errorMessage = "Esta funcionalidad esta temporalmente inhabilitada";
  }

  onClose() {
    this.dialogRef.close();
  }
}