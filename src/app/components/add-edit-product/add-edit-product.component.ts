import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { nonNegativePriceValidator } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
[x: string]: any;

  form: FormGroup;


  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, nonNegativePriceValidator]],
      stock: [null, Validators.required],
    });
  }

  addProduct(): void {
    //console.log(this.form);

    const product: Product = {
      name:         this.form.value.name,
      description:  this.form.value.description,
      price:        this.form.value.price,
      stock:        this.form.value.stock
    }


    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí puedes añadir la lógica para agregar el producto, por ejemplo, enviar los datos a un servidor
    }
    
  }

}
