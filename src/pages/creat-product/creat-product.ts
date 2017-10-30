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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';

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
  pImages: Array<string> = ['https://cdn.noths-static.com/fs/38/38/b2d6-8592-40f7-9c4a-e1f2610d6186/original_omg-you-re-50-birthday-card.jpg','https://cdn.noths-static.com/fs/38/38/b2d6-8592-40f7-9c4a-e1f2610d6186/original_omg-you-re-50-birthday-card.jpg'];
  shops: Array<ShopModel> = [];
  categories: Array<CategoryModel>;
  shippings: Array<ShippingModel>;
  currency: Array<CurrencyModel> = [];
  e = {} as ProductModel;
  chkformimg: Boolean = false;
  showForm: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shopService: ShopService,
    public categoryService: CategoryService,
    public shippingService: ShippingService,
    public currencyService: CurrencyService,
    public loadingCtrl: LoadingProvider,
    public viewCtrl: ViewController
  ) {
    let shopselec = JSON.parse(window.localStorage.getItem('shop'));
    this.shops = [shopselec];

    this.e = this.navParams.data;
    this.e.shop = shopselec._id;
    this.chkformimg = this.navParams.get('keys');
    // console.log(this.e);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatProductPage');
    this.loadCate();
  }
  loadShops() {
    this.loadingCtrl.onLoading();
    this.shopService.getShopListByUser().then((data) => {
      this.shops = data;
      this.loadingCtrl.dismiss();
      this.loadCate();
    }, (err) => {
      this.loadingCtrl.dismiss();
      alert(JSON.parse(err._body).message);
    });
  }

  loadCate() {
    this.loadingCtrl.onLoading();
    this.categoryService.getCategoryList().then((data) => {
      this.categories = data;
      this.loadingCtrl.dismiss();
      this.loadShipping();
    }, (err) => {
      this.loadingCtrl.dismiss();
      alert(JSON.parse(err._body).message);
    });
  }

  loadShipping() {
    this.loadingCtrl.onLoading();
    this.shippingService.getShippingList().then((data) => {
      this.shippings = data;
      this.loadingCtrl.dismiss();
      this.loadCurrency();
    }, (err) => {
      this.loadingCtrl.dismiss();
      alert(JSON.parse(err._body).message);
    });
  }

  loadCurrency() {
    this.loadingCtrl.onLoading();
    this.currencyService.getCurrencyList().then((data) => {
      this.currency = data;
      this.showForm = true;
      this.loadingCtrl.dismiss();
    }, (err) => {
      this.loadingCtrl.dismiss();
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
  cancelDissmis(e) {
    this.viewCtrl.dismiss();
  }
  resImageEvent(e) {
    alert(e);
  }
}
