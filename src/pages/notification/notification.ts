import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams ,MenuController} from 'ionic-angular';
import { ShopModel } from '@ngcommerce/core';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  shop = {} as ShopModel;
  notifications: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public menuController: MenuController) {
  }

  ionViewWillEnter() {
    
    let loading = this.loadingCtrl.create();
    loading.present();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    this.notifications = JSON.parse(window.localStorage.getItem('sellerNotification'));
    loading.dismiss();
    // alert(this.notifications);
    this.workaroundSideMenu();
  }
  private workaroundSideMenu() {
    let leftMenu = this.menuController.get('left');
    if (leftMenu) {
      leftMenu.ionClose.subscribe(() => {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));
      });
    }
  }
}
