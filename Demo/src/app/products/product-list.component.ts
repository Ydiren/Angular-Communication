import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NgModel } from '@angular/forms';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    pageTitle: string = 'Product List';
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    @ViewChild(NgModel) filterInput: NgModel;

    listFilter: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {

    }

    ngAfterViewInit(): void {
      this.filterElementRef.nativeElement.focus();
      console.log('NgModel', this.filterInput);

    }

    ngOnInit(): void {
      this.filterInput.valueChanges.subscribe(
        value => this.performFilter(value)
      );

      this.productService.getProducts().subscribe(
          (products: IProduct[]) => {
              this.products = products;
              this.performFilter(this.listFilter);
          },
          (error: any) => this.errorMessage = <any>error
      );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
