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
  pImages: Array<string> = [];
  shops: Array<ShopModel> = [];
  categories: Array<CategoryModel>;
  shippings: Array<ShippingModel>;
  currency: Array<CurrencyModel> = [];
  e = {} as ProductModel;
  chkformimg: Boolean = false;
  showForm: Boolean = false;
  resImg: Array<string> = [];

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
    this.pImages = this.e.images ? JSON.parse(JSON.stringify(this.e.images)) : [];
    this.e.shop = shopselec._id;
    this.chkformimg = this.navParams.get('keys');
    // console.log(this.e);
    this.e.price = this.e.price ? this.e.price : 0;
    this.e.promotionprice = this.e.promotionprice ? this.e.promotionprice : 0;
    this.e.percentofdiscount = this.e.percentofdiscount ? this.e.percentofdiscount : 0;
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
  // cancelDissmis(e) {
  //   this.viewCtrl.dismiss();
  // }
  canceldissmis() {
    this.viewCtrl.dismiss();
  }
  resImageEvent(e) {
    this.resImg = e;
    // this.e.images = e;
  }

  discountprice() {
    if (this.e.price > 0) {
      this.e.promotionprice = null;
      this.e.percentofdiscount = null;
    }
  }
  discountpromotion() {
    if (this.e.price > 0) {
      if (this.e.promotionprice > 0) {
        if (this.e.price - this.e.promotionprice >= 0) {
          let per = (this.e.promotionprice / this.e.price) * 100;
          let num = (100 - per).toString();
          let numSplit = num.split('.');
          if (numSplit && numSplit.length > 1) {
            let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
            this.e.percentofdiscount = parseFloat(concatNum);
          } else {
            this.e.percentofdiscount = parseFloat(num);
          }

          // this.item.percentofdiscount = parseFloat((100 - per).toFixed(2));
        } else {
          alert('ส่วนลดมากกว่าราคาขายจริง');
          this.e.percentofdiscount = null;
          this.e.promotionprice = null;
        }
      } else {
        this.e.promotionprice = null;
        this.e.percentofdiscount = null;
      }
    } else {
      this.e.promotionprice = null;
      this.e.percentofdiscount = null;
    }
  }
  discountpercent() {
    if (this.e.price > 0) {
      if (this.e.percentofdiscount > 0) {
        if (this.e.percentofdiscount <= 100) {
          let pro = (this.e.percentofdiscount * this.e.price) / 100;
          let proFix = this.e.price - pro;
          let num = (proFix).toString();
          let numSplit = num.split('.');
          if (numSplit && numSplit.length > 1) {
            let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
            this.e.promotionprice = parseFloat(concatNum);
          } else {
            this.e.promotionprice = parseFloat(num);
          }
          // this.e.promotionprice = parseFloat((this.e.price - pro).toFixed(2));
        } else {
          alert('มากกว่า 100 เปอร์เซ็นต์');
          this.e.promotionprice = null;
          this.e.percentofdiscount = null;
        }
      } else {
        this.e.promotionprice = null;
        this.e.percentofdiscount = null;
      }
    } else {
      this.e.promotionprice = null;
      this.e.percentofdiscount = null;
    }
  }

  chkNumber(num, field) {
    let nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let status = false;
    if (num !== null) {

      let numID = num.toString();
      nums.forEach(function (num) {
        if (numID.length > 1) {
          if (numID.substr(numID.length - 1) === num) {
            status = true;
          }
        } else {
          if (numID === num) {
            status = true;
          }
        }

      });

      if (!status) {
        if (field.toString() === 'price') {
          this.e.price = parseFloat(this.e.price.toString().slice(0, this.e.price.toString().length - 1));
        } else if (field.toString() === 'promotionprice') {
          this.e.promotionprice = parseFloat(this.e.promotionprice.toString().slice(0, this.e.promotionprice.toString().length - 1));
        } else if (field.toString() === 'percentofdiscount') {
          this.e.percentofdiscount = parseFloat(this.e.percentofdiscount.toString().slice(0, this.e.percentofdiscount.toString().length - 1));
        }
      }

    } else {
      if (field.toString() === 'price') {
        this.e.price = null;
      } else if (field.toString() === 'promotionprice') {
        this.e.promotionprice = null;
      } else if (field.toString() === 'percentofdiscount') {
        this.e.percentofdiscount = null;
      }
    }
  }

  toFixedNum(numbe, field) {
    if (numbe && numbe !== null) {
      let num = numbe.toString();
      if (field.toString() === 'price') {
        let numSplit = num.split('.');
        if (numSplit && numSplit.length > 1) {
          let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
          this.e.price = parseFloat(concatNum);
        } else {
          this.e.price = parseFloat(numSplit);
        }
      } else if (field.toString() === 'promotionprice') {
        let numSplit = num.split('.');
        if (numSplit && numSplit.length > 1) {
          let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
          this.e.promotionprice = parseFloat(concatNum);
        } else {
          this.e.promotionprice = parseFloat(numSplit);
        }
      } else if (field.toString() === 'percentofdiscount') {
        let numSplit = num.split('.');
        if (numSplit && numSplit.length > 1) {
          let concatNum = numSplit[0] + '.' + numSplit[1].substr(0, 2);
          this.e.percentofdiscount = parseFloat(concatNum);
        } else {
          this.e.percentofdiscount = parseFloat(numSplit);
        }
      }
    }
  }
  onClickAddProd(e) {
    if (!e.name) {
      alert('Please Enter Your Name!');
      return;
    } else if (!e.detail) {
      alert('Please Enter Your Detail!');
      return;
    } else if (!e.price) {
      alert('Please Enter Your Price!');
      return;
    } else if (!e.currency) {
      alert('Please Enter Your Currency!');
      return;
    } else if (!e.shippings) {
      alert('Please Enter Your Shippings!');
      return;
    } else if (!e.categories) {
      alert('Please Enter Your Categories!');
      return;
    } else if (!e.shop) {
      alert('Please Enter Your Shop!');
      return;
    } else if (this.pImages.length === 0) {
      alert('Please Enter Your Upload Image!');
      return;
    }
    if (this.pImages.length > 0) {
      e.images = this.pImages;
      this.viewCtrl.dismiss(e);
    } else {
      e.images = this.resImg;
      this.viewCtrl.dismiss(e);
    }
    // this.itemClicked.emit(item);
  }
}
