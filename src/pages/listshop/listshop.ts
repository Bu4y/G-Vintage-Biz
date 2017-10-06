import { CreateshopPage } from '../createshop/createshop';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { ShopService, ShopModel, ShopListModel } from '@ngcommerce/core';


/**
 * Generated class for the ListshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listshop',
  templateUrl: 'listshop.html',
})
export class ListshopPage {
  shop = {} as ShopListModel;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public shopService: ShopService, public modalControl: ModalController,public loadingCtrl: LoadingController) {
   
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ListshopPage');
    this.getShop();
  }
  getShop() {
    this.shopService.getShopListByUser().then(data => {
      this.shop.items = data;
    });
  }
  createShopModal() {
    let shopModal = this.modalControl.create(CreateshopPage);
    shopModal.onDidDismiss(data => {
      if (data && data.name) {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.shopService.createShop(data)
          .then((resp) => {
            loading.dismiss();
            this.getShop();
          }, (err) => {
            loading.dismiss();
            console.log(err);
          });
      }

    });
    shopModal.present();

  }

}
