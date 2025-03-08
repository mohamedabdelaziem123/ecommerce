import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../../../shared/services/wishList/wish-list.service';
import { wishData } from '../../../../shared/interfaces/wish-list';
import { CartService } from '../../../../shared/services/cart/cart.service';


@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  mywishlist!:wishData[]
  constructor(private wishlist:WishListService,private cartservice:CartService){}
  
  ngOnInit(): void {
    this.GetAllwishlist();
    this.cartservice.GetCart().subscribe(res => this.cartservice.NoItems.next(res.numOfCartItems));
  }

  GetAllwishlist() {
    this.wishlist.getWishList().subscribe({
      next: res => {
        this.mywishlist=res.data
      },
      error: err => {
        
      }
    })
  }
  removefromwishlist(prodId:string) {
    return this.wishlist.removefromWishList(prodId).subscribe({
          next: res => {
            this.GetAllwishlist()
            
          },
          error: err => {
            
          }
        })
  }
  addtowishlist(prodId:string) {
    return this.wishlist.addtoWishList(prodId).subscribe({
      next: res => {
        
        
        
      },
      error: err => {
        
      }
    })
  }

  AddtoCartfromWishlist(prodId:string) {
    return this.cartservice.AddtoCart(prodId).subscribe({
      next: res => {
        this.cartservice.NoItems.next(res.numOfCartItems)
      },
      error:  err =>{
        
      }
    })
  }
  MoveFromWishListToCart(prodId:string) {
    this.AddtoCartfromWishlist(prodId);
    this.removefromwishlist(prodId);
  }
}
