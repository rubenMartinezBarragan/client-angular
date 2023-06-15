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
        var errorStatus = error.substring(56, 59);
        var messageException = "";

        if (errorStatus == "405")
            messageException = 'NO se puede dar de alta a un cliente con el mismo nombre que otro existente.';
        else
            messageException = 'No se puede dar de alta al cliente';

        this.errorMessage = messageException;
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