import { CreatProductPage } from '../creat-product/creat-product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CorService, ProductModel, ProductService } from "@ngcommerce/core";
import { LoadingProvider } from '../../providers/loading/loading';
import { Dialogs } from "@ionic-native/dialogs";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  items = {} as ProductModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private dialogs: Dialogs
  ) {
    {
      this.loadingCtrl.onLoading();
      this.productService.getProductByID(this.navParams.data._id).then(data => {
        console.log(data);
        this.items = data;
        this.loadingCtrl.dismiss();
      }).catch(e => {
        this.loadingCtrl.dismiss();
        this.dialogs.alert(JSON.parse(e._body).message, 'Product Detail');
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  alertdeleteProduct(item) {
    this.presentConfirm(item);
  }
  deleteProduct(item) {
    this.loadingCtrl.onLoading();
    this.productService.deleteProduct(item._id).then((data) => {
      this.navCtrl.pop();
      this.loadingCtrl.dismiss();
    }, (err) => {
      this.dialogs.alert(JSON.parse(err._body).message, 'Product Detail');
      this.loadingCtrl.dismiss();
    });
  }
  presentConfirm(item) {
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this Product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('delete');
            this.deleteProduct(item);
          }
        }
      ]
    });
    alert.present();
  }
  updateProduct(e) {
    console.log(e);
    // e = {} as ProductModel;
    let productBind = {
      _id: e._id,
      name: e.name,
      detail: e.detail,
      price: e.price,
      // currency: {
      //   _id: e.currency._id
      // },
      currency: e.currency,
      promotionprice: e.promotionprice,
      percentofdiscount: e.percentofdiscount,
      shop: e.shop._id,
      shippings: [],
      categories: [],
      images: e.images
    };
    // e.images.forEach(element => {
    //   productBind.images.push({
    //     imgUrl: element
    //   });
    // });
    e.categories.forEach(element => {
      productBind.categories.push(element._id);
    });
    e.shippings.forEach(element => {
      productBind.shippings.push(element._id);
    });
    console.log(productBind);
    let productModal = this.modalCtrl.create(CreatProductPage, productBind);
    productModal.onDidDismiss(data => {
      if (data && data.name && data.name !== undefined) {
        this.loadingCtrl.onLoading();
        this.productService.updateProduct(data).then((resq) => {
          this.loadingCtrl.dismiss();
          this.loadingCtrl.onLoading();
          this.productService.getProductByID(this.navParams.data._id).then(data => {
            console.log(data);
            this.items = data;
            this.loadingCtrl.dismiss();
          }).catch(e => {
            this.loadingCtrl.dismiss();
            this.dialogs.alert(JSON.parse(e._body).message, 'Product Detail');
          })
          // this.navCtrl.pop();
        }, (err) => {
          this.loadingCtrl.dismiss();
          this.dialogs.alert(JSON.parse(err._body).message, 'Product Detail');
        });
      }
    });
    productModal.present();
  }
}
