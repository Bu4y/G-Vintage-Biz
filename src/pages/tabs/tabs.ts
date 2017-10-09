import { CreateshopPage } from '../createshop/createshop';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { ShopService } from '@ngcommerce/core';
import { NotificationPage } from '../notification/notification';
import { ProductPage } from '../product/product';
import { OrderPage } from '../order/order';
import { AccountPage } from '../account/account';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrderPage;
  tab3Root = ProductPage;
  tab4Root = NotificationPage;
  tab5Root = AccountPage;

  constructor(public shopService: ShopService, public modalControl: ModalController,public loadingCtrl: LoadingController) {
    
  }

  ionViewWillEnter(){
    this.getShop();
  }
  getShop() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.shopService.getShopListByUser().then(data => {
      console.log(data);
      loading.dismiss();
      if (data && data.length === 0) {
        this.createShopModal();
      }
    }, err => {
      loading.dismiss();
      alert(err);
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
          }, (err) => {
            loading.dismiss();
            alert(err);
          });
      }

    });
    shopModal.present();

  }
}
