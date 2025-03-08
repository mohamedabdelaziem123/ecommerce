import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        }
      },
      nav: true
    }
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute,private cartservice:CartService,private toastr: ToastrService ) {
    
  }
  ngOnInit(): void {
    this.getOneProduct(); 
    this.cartservice.GetCart().subscribe(res => this.cartservice.NoItems.next(res.numOfCartItems));

  }
  getOneProduct() {
    this.activatedRoute.params.subscribe({
      next: res => {
        
        this.productService.getOneProduct(res["_id"]).subscribe({
          next: res => {
            this.product = res.data;
            
          },
          error: err => {
           
          }
        })
      }
    })
    
  }

  AddtoCart(id: string) {
    this.cartservice.AddtoCart(id).subscribe({
      next: res => {
       this.cartservice.NoItems.next(res.numOfCartItems)
        this.toastr.success(res.message, '', {
          progressBar: true
        });
      },
      error: err => {
  
        
        this.toastr.error("ERROR", 'something went wrong', {
          progressBar: true
        });
        }
    });
    
  }
}
