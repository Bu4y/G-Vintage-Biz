import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShopService } from '@ngcommerce/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  private shopList: Array<any> = [];

  constructor(public shopService: ShopService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initLoadStoreList();
    });
  }

  initLoadStoreList() {
    this.shopService.getShopListByUser().then(data => {
      this.shopList = data;
    }).catch(err => {

    });
  }

  selectShop(item) {
    window.localStorage.setItem('shop', JSON.stringify(item));
    let shop = window.localStorage.getItem('shop');
    console.log(shop);
  }
}
