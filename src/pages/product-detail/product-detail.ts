import { CreatProductPage } from '../creat-product/creat-product';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CorService, ProductModel, ProductService } from "@ngcommerce/core";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, ) {
    {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.productService.getProductByID(this.navParams.data._id).then(data => {
        console.log(data);
        this.items = data;
        loading.dismiss();
      }).catch(e => {
        loading.dismiss();
        alert(e);
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
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productService.deleteProduct(item._id).then((data) => {
      this.navCtrl.pop();
      loading.dismiss();
    }, (err) => {
      alert(JSON.parse(err._body).message);
      loading.dismiss();
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
    // e = {} as ProductModel;
    let productBind = {
      _id:e._id,
      name: e.name,
      detail: e.detail,
      price: e.price,
      currency: e.currency,
      promotionprice: e.promotionprice,
      percentofdiscount: e.percentofdiscount,
      shop: e.shop,
      shippings: e.shippings,
      categories: e.categories,
      images:e.images
    };
    console.log(e.name);
    let productModal = this.modalCtrl.create(CreatProductPage, productBind);
    productModal.onDidDismiss(data => {
      if (data && data.name && data.name !== undefined) {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.productService.updateProduct(data).then((resq) => {
          loading.dismiss();
          this.navCtrl.pop();
        }, (err) => {
          loading.dismiss();
          alert(JSON.parse(err._body).message);
        });
      }
    });
    productModal.present();
  }
}
