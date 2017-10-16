import {
  CategoryModel,
  CategoryService,
  ProductModel,
  ShippingModel,
  ShippingService,
  ShopListModel,
  ShopModel,
  ShopService,
  CurrencyModel,
  CurrencyService
} from '@ngcommerce/core';
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

  shops: Array<ShopModel> = [];
  categories: Array<CategoryModel>;
  shippings: Array<ShippingModel>;
  currency: Array<CurrencyModel> = [];
  e = {} as ProductModel;
  showForm: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public categoryService: CategoryService,
    public shippingService: ShippingService,
    public currencyService: CurrencyService,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController
  ) {
    this.e = this.navParams.data;
    // console.log(this.e);
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
      alert(JSON.parse(err._body).message);
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
      alert(JSON.parse(err._body).message);
    });
  }

  loadShipping() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shippingService.getShippingList().then((data) => {
      this.shippings = data;
      loading.dismiss();
      this.loadCurrency();
    }, (err) => {
      loading.dismiss();
      alert(JSON.parse(err._body).message);
    });
  }

  loadCurrency() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.currencyService.getCurrencyList().then((data) => {
      this.currency = data;
      this.showForm = true;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      alert(JSON.parse(err._body).message);
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
