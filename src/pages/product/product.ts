import { ProductDetailPage } from './../product-detail/product-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { CorService, ProductListModel, ProductService, ShopModel } from "@ngcommerce/core";

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
  loadData: Boolean = false;
  shopSelected = JSON.stringify(JSON.parse(window.localStorage.getItem('shop')));
  shop = {} as ShopModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public menuController: MenuController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    
    this.shop = JSON.parse(window.localStorage.getItem('shop'));
    if (this.shop && this.shop._id) {
      this.getProduct(this.shop);
    }
    this.workaroundSideMenu();
  }

  private workaroundSideMenu() {
    let leftMenu = this.menuController.get('left');

    if (leftMenu) {
      leftMenu.ionClose.subscribe(() => {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
        if (this.shop._id !== JSON.parse(this.shopSelected)._id) {
          this.getProduct(this.shop);
          this.shopSelected = JSON.stringify(this.shop);

          let alert = this.alertCtrl.create({
            title: 'Load product complete',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  console.log('Loadding complete');
                }
              }
            ]
          });
          alert.present();

        }
      });
    }
  }

  getProduct(shop) {
    this.product = {} as ProductListModel;
    this.productService.getProductListByShop(shop._id).then(data => {
      console.log(data);
      this.product = data;
      var component = this.navCtrl.getActive().instance;
    }).catch(e => {
      console.log(e);
    })
  }

  selected(items) {
    this.navCtrl.push(ProductDetailPage, items);
  }

}
