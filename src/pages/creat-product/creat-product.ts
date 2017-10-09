import { ShopService, ShopListModel, CategoryService, CategoryModel, ShippingService, ShippingModel, ShopModel } from '@ngcommerce/core';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CreatProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creat-product',
  templateUrl: 'creat-product.html',
})
export class CreatProductPage {

  shops :Array<ShopModel> = [];
  categories: Array<CategoryModel>;
  shippings: Array<ShippingModel>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public categoryService: CategoryService,
    public shippingService: ShippingService,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatProductPage');
    this.loadShops();
  }
  loadShops() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shopService.getShopListByUser().then((data) => {
      this.shops = data;
      loading.dismiss();
      this.loadCate();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }

  loadCate() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.categoryService.getCategoryList().then((data) => {
      this.categories = data;
      loading.dismiss();
      this.loadShipping();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }

  loadShipping() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shippingService.getShippingList().then((data) => {
      this.shippings = data;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }

  createProduct(e) {
    // if(e.image && e.image !== undefined){
    //   e = e ? e : {};
    //   e.images = e.images ? e.images : [];
    //   e.images.push(e.image);
    // }
    this.viewCtrl.dismiss(e);
    // console.log(e);
  }

}
