import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    //Injeccion de clases
    private fb: FormBuilder,
    private _productService: ProductService,
    //Injeccion router con typeScript
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, nonNegativePriceValidator]],
      stock: [null, Validators.required],
    })

    //si aRouter.snapshot.paramMap.get('id') es undefined, entonces Number es 0
    this.id = Number(aRouter.snapshot.paramMap.get('id'))

    //Capturamos el valor de la url
    //aRouter.snapshot.paramMap.get('id');
  }


  ngOnInit(): void{
    if(this.id != 0) {
      //es editar
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number){
    this.loading = true;
    //modifico el producto
    this._productService.getProduct(id).subscribe( (data:Product) => {
      this.loading = false;
      /*
      //De esta forma, modificamos solo las propiedades definidas
      this.form.patchValue({
        name: data.name
      })
      */

      //De esta manera modificamos todo el objeto, definiendo cada pripiedad del eleemento
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.description,
      })
    })
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
      
      if(this.id !== 0){
        product.id = this.id;
        this._productService.saveProduct(product).subscribe(()=> {
          this.toastr.info(`El producto ${product.name} fue actualizado con exito.`, 'Producto Actualizado');
          this.loading = false;
          this.router.navigate(['/']);})
      } else {
        this._productService.saveProduct(product).subscribe(()=> {
          this.toastr.success(`El producto ${product.name} fue registrado con exito.`, 'Producto Registrado');
          this.loading = false;
          this.router.navigate(['/']);
        })
      }

    }

  }

}
