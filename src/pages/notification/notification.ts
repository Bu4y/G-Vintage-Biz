import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

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
  notifications: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.notifications = JSON.parse(window.localStorage.getItem('sellerNotification'));
    loading.dismiss();
    // alert(this.notifications);
  }

}
