import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform( productlist: Product[],searchdata: string): Product[] {
    let newproductlist:Product[]=[];
    for (const product of productlist) {
     
        if ((product.title.toLowerCase().includes(searchdata.toLowerCase())))
          newproductlist.push(product);
    };
    return newproductlist;
  }

}
