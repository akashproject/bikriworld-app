import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  product : any = []
  variants : any = {}
  maxPrice : string;
  loc : any;
  disableBtn = true;

  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) { }

  ngOnInit() {
    
    this.loc = this.location.getState();
    localStorage.setItem("product_id", JSON.stringify(this.loc.product_id));
    this.viewProduct(this.loc.product_id);
  }

  viewProduct(product_id){    
    this.util.presentLoading();
    this.api.get('api/product/'+product_id).subscribe((data: any) => {
      this.product = data;
      this.variants = JSON.parse(data.variant);
      this.maxPrice = data.max_price
      this.util.hideLoading();
    });
  }

  setVariant(variant){
    let variation_type = variant.ram +' | '+ variant.storage
    localStorage.setItem("variant", JSON.stringify(variant));
    localStorage.setItem("variation_type", variation_type);
    localStorage.setItem("veriation_price", variant.price);
    this.maxPrice = variant.price;
    this.disableBtn = false;
  }

  gotoQuestion(){
    this.router.navigate(['/question']);
  }

}
