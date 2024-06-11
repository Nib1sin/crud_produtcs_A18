import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { nonNegativePriceValidator } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {

  //[x: string]: any;
  form: FormGroup;
  loading: boolean= false;

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    //Injeccion con typeScript
    private router: Router,
    private toastr: ToastrService
  ){
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
      this.loading = true;
      this._productService.saveProduct(product).subscribe(()=> {
        this.loading = false;
        this.toastr.success(`El producto ${product.name} ha sido agregado`, 'Producto Registrado');
        this.router.navigate(['/']);
      })
    }
  }

}
