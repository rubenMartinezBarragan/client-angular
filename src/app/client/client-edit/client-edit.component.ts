import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  client : Client;
  errorMessage = "";

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.data.client != null) {
      this.client = Object.assign({}, this.data.client);
    }
    else {
      this.client = new Client();
    }
  }

  onSave() {
    this.clientService.saveClient(this.client).subscribe(
      result => {
        this.dialogRef.close();
        this.showSuccess();
      },
      error => {
        this.errorMessage = "No se puede dar de alta al cliente";
      }
    );    
  }  

  onClose() {
    this.dialogRef.close();
  }

  showSuccess() {
    this.toastr.success('¡La operación se ha realizado correctamente!', 'Clientes');
  }
}