import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  category : Category;
  errorMessage = "";

  constructor(
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.data.category != null) {
      this.category = Object.assign({}, this.data.category);
    }
    else {
      this.category = new Category();
    }
  }

  onSave() {
    this.categoryService.saveCategory(this.category).subscribe(
      result => {
        this.dialogRef.close();
        this.showSuccess();
      },
      error => {
        this.errorMessage = "No se puede dar de alta la categoría";
      }
    );    
  }

  onClose() {
    this.dialogRef.close();
  }

  showSuccess() {
    this.toastr.success('¡La operación se ha realizado correctamente!', 'Listado de Categorías');
  }
}