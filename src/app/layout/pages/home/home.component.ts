import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import {  FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { HomeSliderComponent } from '../../additions/home-slider/home-slider.component';
import { CurrencyPipe } from '@angular/common';
import { CategorySliderComponent } from '../../additions/category-slider/category-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { wishData } from '../../../shared/interfaces/wish-list';

@Component({
  selector: 'app-home',
  imports: [FormsModule,SearchPipe,HomeSliderComponent,CurrencyPipe,CategorySliderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchData: string = "";
  productlist!: Product[];
  
  
  
  constructor(private productservice:ProductService,private cartservice:CartService,private toastr: ToastrService,private wishlist:WishListService,private renderer: Renderer2) {
   
  }
  ngOnInit(): void {
    this.GetAllProducts();
    this.markwishlistitems();
    this.cartservice.GetCart().subscribe(res => this.cartservice.NoItems.next(res.numOfCartItems));
  }
  GetAllProducts() {
    return this.productservice.getAllProducts().subscribe({
      next: res => {
        
        this.productlist = res.data;
        
        
      },
      error: err => {
     
      }
    })
  }

  AddtoCart(id: string) {
    this.cartservice.AddtoCart(id).subscribe({
      next: res => {
        
        this.toastr.success(res.message, '', {
          progressBar: true
        });
        this.cartservice.NoItems.next(res.numOfCartItems)
      }
    });
    
  }
  //////////////////////////////////////////////////////////////////////////
  AddandRemoveWishList(prodId: string) {

    
    const heart = document.getElementById(prodId);
    
    console.log(heart);
    if (!(heart?.classList.contains("text-red-500"))) {
     
      
      
      return this.wishlist.addtoWishList(prodId).subscribe({
        next: res => {
          
          this.renderer.addClass(heart, "text-red-500");
          this.toastr.success(res.message, '', {
            progressBar: true
          });
          
        },
        error: err => {
          
        }
      })
    }else {
      if (heart?.classList.contains("text-red-500")) {
       
        
        return this.wishlist.removefromWishList(prodId).subscribe({
          next: res => {
          
            this.renderer.removeClass(heart,"text-red-500");
            this.toastr.success("product removed successfully from your wishlist", '', {
          progressBar: true
        });
            
          },
          error: err => {
            
          }
        })
      }
    }
    return;
   
  }
  markwishlistitems() {
    let wishlistProd:wishData[]=[]
    return this.wishlist.getWishList().subscribe({
      next: res => {
        wishlistProd = res.data;
        wishlistProd.forEach(product => {
          const itemstoMark = document.getElementById(product._id)
          if(itemstoMark)
          this.renderer.addClass(itemstoMark,"text-red-500");
          
        });
      },
      error: err => {
        
      }
    })
  }
 
    
  
}
