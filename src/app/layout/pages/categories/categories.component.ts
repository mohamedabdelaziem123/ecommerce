import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { category } from '../../../shared/interfaces/category';
import { SubcategoriesService } from '../../../shared/services/subcategories/subcategories.service';
import { subData } from '../../../shared/interfaces/subcategories';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryData!: category[]
  Displayedsubcategories: subData[] = []
  catname:string=""
  constructor(private categoryservice: CategoryService, private subcategoriesservice: SubcategoriesService,private cartservice:CartService) { }
  ngOnInit(): void {
    this.Getallcategories();
    this.cartservice.GetCart().subscribe(res => this.cartservice.NoItems.next(res.numOfCartItems));
    
  }
  
  Getallcategories() {
    this.categoryservice.getAllCategory().subscribe({
      next: res => {
        
        this.categoryData = res.data;
        
      },
      error: err => {
        
      }
    })
  }

  Getsubcategories(categoryid: string, name: string) {
    this.Displayedsubcategories=[]
    this.subcategoriesservice.getallsubcategories().subscribe({
      next: res => {
        res.data.forEach(subcategory => {
          if (subcategory.category == categoryid)
            this.Displayedsubcategories.push(subcategory);
          this.catname = name;
          
         });
        
      },
      error: err => {
        
      }
    })
    
  }

}
