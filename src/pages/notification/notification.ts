import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';
import { ShopModel } from '@ngcommerce/core';
import { LoadingProvider } from '../../providers/loading/loading';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingProvider,public menuController: MenuController) {
  }

  ionViewWillEnter() {
    
    this.loadingCtrl.onLoading();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    this.notifications = JSON.parse(window.localStorage.getItem('sellerNotification'));
    this.loadingCtrl.dismiss();
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
