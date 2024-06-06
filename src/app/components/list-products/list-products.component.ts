import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  
  loading: boolean = false;
  listProducts: Product[] = []


  constructor(
    private _productService: ProductService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void{
    this.getListProducts();
  }
  

  //Recupera los productos del backend
  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data: Product[]) => {
      //console.log(data)
      this.listProducts = data;
      this.loading = false;
    })
  }

  deleteProduct(id: number){
    //console.log(id);
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(()=> {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto Eliminado');
    })
  }

}
