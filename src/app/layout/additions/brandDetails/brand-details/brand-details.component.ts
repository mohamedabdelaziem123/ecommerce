import { Component, Input, input, OnInit } from '@angular/core';
import { BrandsService } from '../../../../shared/services/brands/brands.service';
import { Data } from '../../../../shared/interfaces/brands';

@Component({
  selector: 'app-brand-details',
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {

  @Input() brandId!: string
  detailedbrand!:Data
  constructor(private brandsservice: BrandsService) {
    
  }
  ngOnInit(): void {
    
    this.Getspecificbrand();
  }
  closemodal() {
    this.brandsservice.switchmodal = !this.brandsservice.switchmodal;
    
  }
  Getspecificbrand() {
    return this.brandsservice.getspecificbrand(this.brandId).subscribe({
      next: res => {
      
        this.detailedbrand = res.data;
        
      }
    })
  }
}
