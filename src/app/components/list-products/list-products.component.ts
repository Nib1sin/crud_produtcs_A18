import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  listProducts: Product[] = [
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


  constructor(private _productService: ProductService) {

  }

  ngOnInit(): void{
    this.getListProducts();
  }
  

  getListProducts() {
    this._productService.getListProducts().subscribe((data) => {
      console.log(data)
    })
  }



}
