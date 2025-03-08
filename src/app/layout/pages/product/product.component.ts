import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import {  FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { wishData } from '../../../shared/interfaces/wish-list';

@Component({
  selector: 'app-product',
  imports: [FormsModule,SearchPipe,CurrencyPipe,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  
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
  GetAllProducts1() {
    const page = document.getElementById("page1");
    if (page?.classList.contains("bg-gray-300")) {
      return this.productservice.getAllProducts().subscribe({
        next: res => {
          
          this.productlist = res.data;
          this.switchpages("1");
          this.switchpages("2");
          this.markwishlistitems();
          
        },
        error: err => {
       
        }
      })   
    }
    return;
     
    }
  GetAllProducts2() {
    const page = document.getElementById("page2");
    if (page?.classList.contains("bg-gray-300")) {
      return this.productservice.getAllProducts2().subscribe({
        next: res => {
          
          this.productlist = res.data;
          this.switchpages("2");
          this.switchpages("1");
          this.markwishlistitems();
          
          
          
        },
        error: err => {
       
        }
      })     
    }
    return;
  }
  switchpages(pageno:string) {
    const page = document.getElementById("page" + pageno);

    if (page) {

      if (page.classList.contains("bg-gray-300")) {

        this.renderer.addClass(page, "bg-green-500");
        this.renderer.removeClass(page, "bg-gray-300");
     
      }
   
      else {
        
        this.renderer.addClass(page, "bg-gray-300");
        this.renderer.removeClass(page, "bg-green-500");
      }
      
    }

  }
 
  
    AddtoCart(id: string) {
      this.cartservice.AddtoCart(id).subscribe({
        next: res => {
          
          this.toastr.success(res.message, '', {
            progressBar: true
          });
          this.cartservice.NoItems.next(res.numOfCartItems)
        },
        error: err => {
    
          
          this.toastr.error("ERROR", 'something went wrong', {
            progressBar: true
          });
          }
      });
      
    }
    //////////////////////////////////////////////////////////////////////////
    AddandRemoveWishList(prodId: string) {
  
      
      const heart = document.getElementById(prodId);
      
      
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
