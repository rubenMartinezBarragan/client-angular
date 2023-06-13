import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-loan-edit',
    templateUrl: './loan-edit.component.html',
    styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {
    loan: Loan; 
    games: Game[];
    clients: Client[];
    errorMessage = "";

    constructor(
        public dialogRef: MatDialogRef<LoanEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private loanService: LoanService,
        private gameService: GameService,
        private clientService: ClientService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        if (this.data.loan != null) {
            this.loan = Object.assign({}, this.data.loan);
        }
        else {
            this.loan = new Loan();
        }

        this.gameService.getGames().subscribe(
            games => {
                this.games = games;

                if (this.loan.game != null) {
                    let gameFilter: Game[] = games.filter(game => game.id == this.data.loan.game.id);
                    if (gameFilter != null) {
                        this.loan.game = gameFilter[0];
                    }
                }
            }
        );

        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients

                if (this.loan.client != null) {
                    let clientFilter: Client[] = clients.filter(client => client.id == this.data.loan.client.id);
                    if (clientFilter != null) {
                        this.loan.client = clientFilter[0];
                    }
                }
            }
        );
    }

    onSave() {
        this.loanService.saveLoan(this.loan).subscribe(
            result => {
                this.dialogRef.close();
                this.showSuccess();
            },
            error => {
                //this.errorMessage = "No se puede dar de alta el préstamo";

                var errorStatus = error.substring(59, 62);
                console.log('errorStatus ->' + errorStatus + '<-');
                var messageException = "";

                if (errorStatus == "401")
                    messageException = 'La fecha de fin NO puede ser anterior a la fecha de inicio.';
                else if (errorStatus == "403")
                    messageException = 'El periodo de préstamo máximo solo puede ser de 14 días.';
                else if (errorStatus == "404")
                    messageException = 'El mismo juego no puede estar prestado a dos clientes distintos en un mismo día.';
                else if (errorStatus == "409")
                    messageException = 'Un mismo cliente no puede tener prestados más de 2 juegos en un mismo día.';
                else
                    messageException = 'No se puede dar de alta el préstamo';

                this.errorMessage = messageException;
            }
        );    
    }  

    onClose() {
        this.dialogRef.close();
    }

    showSuccess() {
        this.toastr.success('¡El nuevo préstamo se ha realizado correctamente!', 'Préstamos');
    }
}