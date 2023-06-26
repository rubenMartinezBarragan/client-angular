import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { ToastrService } from 'ngx-toastr';

@Component({
selector: 'app-loan-list',
templateUrl: './loan-list.component.html',
styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
    games: Game[];
    clients: Client[];
    loans: Loan[];
    filterTitle: Game;
    filterClient: Client;
    filterDateSearch: Date;

    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Loan>();
    displayedColumns: string[] = ['id', 'name_game', 'name_client', 'dateLoan', 'dateReturn', 'action'];

    constructor(
        private gameService: GameService,
        private clientService: ClientService,
        private loanService: LoanService,
        public dialog: MatDialog,
        private dateAdapter: DateAdapter<Date>,
        private toastr: ToastrService
    )   { 
            this.dateAdapter.setLocale('es-ES');
            this.dateAdapter.getFirstDayOfWeek = () => 1;
        }

    ngOnInit(): void {
        this.loadPage();

        this.gameService.getGames().subscribe(
          games => this.games = games
        );

        this.clientService.getClients().subscribe(
          clients => this.clients = clients
        );
    }

    loadPage(event?: PageEvent) {
        let pageable : Pageable =  {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        if (event != null) {
            pageable.pageSize = event.pageSize
            pageable.pageNumber = event.pageIndex;
        }

        this.loanService.getLoans(pageable).subscribe(data => {
            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    }

    onCleanFilter(): void {
        this.filterTitle = null;
        this.filterClient = null;
        this.filterDateSearch = null;

        this.loadPage();
    }

    onSearch(): void {
        let idGame = this.filterTitle != null ? this.filterTitle.id : null;
        let idClient = this.filterClient != null ? this.filterClient.id : null;
        let dateSearch = this.filterDateSearch != null ? formatDate(this.filterDateSearch, 'yyyy-MM-dd', "en-US") : null;

        this.loanService.getLoansFilter(idGame, idClient, dateSearch).subscribe(data => {
            this.dataSource.data = data;
            this.totalElements = data.length;
        });
    }

    createLoan() {      
        const dialogRef = this.dialog.open(LoanEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });      
    }

    deleteLoan(loan: Loan) {    
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loanService.deleteLoan(loan.id).subscribe(result =>  {
                    if (this.totalElements > 1) {
                        this.totalElements = this.totalElements - 1;

                        if (this.totalElements <= this.pageNumber*this.pageSize)
                            this.pageNumber = this.pageNumber - 1;
                    }

                    this.ngOnInit();
                });

                this.showSuccess();
            }
        });
    }

    showSuccess() {
        this.toastr.success('¡El préstamo se ha eliminado correctamente!', 'Préstamos');
    }
}