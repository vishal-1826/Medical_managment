import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatPaginatorModule, MatTableModule,MatIconModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css'
})
export class EditProductDialogComponent {
  editForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: [data.name],
      category: [data.category],
      price: [data.price],
      quantity: [data.quantity],
      expirationDate: [data.expirationDate],
      supplier: [data.supplier]
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    this.dialogRef.close(this.editForm.value);
  }

}
