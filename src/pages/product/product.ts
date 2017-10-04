import { ProductDetailPage } from './../product-detail/product-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService,ProductListModel,ProductService } from "@ngcommerce/core";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  
  product = {} as ProductListModel;

  constructor(public navCtrl: NavController, public navParams: NavParams , public productService :ProductService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.getProduct();
  }

  getProduct(){
    this.productService.getProductList().then(data=>{
        console.log(data);
        this.product = data;
    }).catch(e=>{
        console.log(e);
    })
  }

  selected(items){
    this.navCtrl.push(ProductDetailPage,items);
  }

}
