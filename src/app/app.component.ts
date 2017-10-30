import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform, MenuController, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShopService, UserModel } from '@ngcommerce/core';
import { TabsPage } from '../pages/tabs/tabs';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  private shopList: Array<any> = [];
  user = {} as UserModel;
  constructor(
    public shopService: ShopService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuController: MenuController,
    public loadingCtrl: LoadingController,
    private oneSignal: OneSignal,
    public events: Events

  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.initOnesignal();
      }
    });
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
    if (this.user) {
      this.rootPage = TabsPage;
    }
    this.workaroundSideMenu();
    this.configFirebase();
  }


  configFirebase() {
    let config = {
      apiKey: "AIzaSyCweKU6JKA5Peppq6pVw3Iur7eIyZj7rGc",
      authDomain: "i3chat-75016.firebaseapp.com",
      databaseURL: "https://i3chat-75016.firebaseio.com",
      projectId: "i3chat-75016",
      storageBucket: "i3chat-75016.appspot.com",
      messagingSenderId: "386067578103"
    };
    firebase.initializeApp(config);
  }

  initOnesignal() {
    this.oneSignal.startInit('fdfae3dc-e634-47f4-b959-f04e60f4613b', '464766391164');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((onReceived) => {
      // do something when notification is received
      this.events.publish('notification:received');
      let notifications = window.localStorage.getItem('sellerNotification') ? JSON.parse(window.localStorage.getItem('sellerNotification')) : [];

      notifications.unshift({
        date: new Date(),
        message: onReceived.payload.body
      });

      window.localStorage.setItem('sellerNotification', JSON.stringify(notifications));
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

  initLoadStoreList() {
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));

    if (this.user) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.shopService.getShopListByUser().then(data => {
        this.shopList = data;
        loading.dismiss();
      }).catch(err => {
        window.localStorage.removeItem('jjuserbuyer');
        window.localStorage.removeItem('shop');
        this.rootPage = LoginPage;
        loading.dismiss();

      });
    }
  }

  selectShop(item) {
    window.localStorage.setItem('shop', JSON.stringify(item));
    this.events.publish('notification:received'); // ขอใช้ Function เดียวกับ notification ครับ
  }

  private workaroundSideMenu() {
    setTimeout(() => {
      let leftMenu = this.menuController.get('left');

      if (leftMenu) {
        leftMenu.ionOpen.subscribe(() => {
          this.initLoadStoreList();
        });
      }
    }, 1000);
  }

  isShow(id) {
    let shopId = window.localStorage.getItem('shop') ? JSON.parse(window.localStorage.getItem('shop'))._id : null;
    return shopId === id;
  }

}
