import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  
  /*
  listProducts: Product[] = [
    /*
    { 
      id: 1,
      name: 'Coca Cola', 
      description: 'Bebida azucarada', 
      price: 4, 
      stock: 500
    },
    { 
      id: 2,
      name: 'Ceres', 
      description: 'Bebida con alcohol', 
      price: 10, 
      stock: 200
    },
  ]
  */
  loading: boolean = false;
  listProducts: Product[] = []


  constructor(private _productService: ProductService) {

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
    })
  }

}
