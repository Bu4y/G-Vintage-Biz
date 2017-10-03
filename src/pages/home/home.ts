import { OneSignal } from '@ionic-native/onesignal';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private oneSignal: OneSignal, public platform: Platform) {
    if (this.platform.is('cordova')) {
      // this.initOnesignal();
    }

  }

  initOnesignal() {
    this.oneSignal.startInit('d5d9533c-3ac8-42e6-bc16-a5984bef02ff', '687344947918');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

}
