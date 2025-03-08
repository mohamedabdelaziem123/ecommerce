import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { brands } from '../../../shared/interfaces/brands';
import { BrandDetailsComponent } from '../../additions/brandDetails/brand-details/brand-details.component';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-brands',
  imports: [BrandDetailsComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brandsData!: brands[];
  
  id!: string;
  constructor(public brandsservice: BrandsService,private cartservice:CartService) { }
  ngOnInit(): void {
    this.Getallbrands();
    this.cartservice.GetCart().subscribe(res => this.cartservice.NoItems.next(res.numOfCartItems));
    
  }

  switchmodal(oneid:string) {
    this.brandsservice.switchmodal = !this.brandsservice.switchmodal;
    this.id = oneid;
  }

  Getallbrands() {
    this.brandsservice.getallbrand().subscribe({
      next: res => {
        console.log(res)
        this.brandsData = res.data;
        console.log(this.brandsData)
     },
      error: err => {
       
     }
   })
  }
  
}
