// filepath: /C:/Users/Administrator/Medical Managment/Medical_managment/src/app/add-product-dialog/add-product-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule]
})
export class AddProductDialogComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    private fb: FormBuilder,private AuthService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: [data.name,Validators.required],
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
    if (this.productForm.valid) {
      this.AuthService.addProduct(this.productForm.value).subscribe((data) =>
        {

        });
      this.dialogRef.close(this.productForm.value);
    }
    else{
      console.log("Invalid form");
    }

  }
}
