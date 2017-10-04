import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { Platform, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShopService, UserModel } from '@ngcommerce/core';
import { TabsPage } from '../pages/tabs/tabs';

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
    public loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
    if (this.user) {
      this.rootPage = TabsPage;
    }
    this.workaroundSideMenu();
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
    let shop = window.localStorage.getItem('shop');
    console.log(shop);
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

  isShow(id){
    let shopId = window.localStorage.getItem('shop') ? JSON.parse(window.localStorage.getItem('shop'))._id : null;
    return shopId === id;
  }

}
