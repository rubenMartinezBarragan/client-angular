import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../author.service';
import { Author } from '../model/Author';
import { ToastrService } from 'ngx-toastr';

@Component({
selector: 'app-author-edit',
templateUrl: './author-edit.component.html',
styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {

    author : Author;
    errorMessage = "";

    constructor(
        public dialogRef: MatDialogRef<AuthorEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authorService: AuthorService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        if (this.data.author != null) {
            this.author = Object.assign({}, this.data.author);
        }
        else {
            this.author = new Author();
        }
    }

    onSave() {
        this.authorService.saveAuthor(this.author).subscribe(
            result =>  {
                this.dialogRef.close();
                this.showSuccess();
            },
            error => {
                this.errorMessage = "No se puede dar de alta al autor";
            }
        ); 
    }  

    onClose() {
        this.dialogRef.close();
    }

    showSuccess() {
        this.toastr.success('¡La operación se ha realizado correctamente!', 'Listado de Autores');
    }
}