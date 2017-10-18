import { ShopModel } from '@ngcommerce/core';
import { LoginPage } from './../login/login';
import { ListshopPage } from '../listshop/listshop';
import { Component } from '@angular/core';
import { App, IonicPage, MenuController, ModalController, NavController, NavParams, Events } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user: any;
  shop = {} as ShopModel;
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public modalControl: ModalController, public menuController: MenuController, public loadingCtrl: LoadingProvider, public events: Events) {
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
  }

  ionViewWillEnter() {
    this.workaroundSideMenu();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    console.log('ionViewDidLoad AccountPage');
  }

  logout(e) {
    window.localStorage.removeItem('jjuserbuyer');
    window.localStorage.removeItem('shop');


    this.events.unsubscribe('notification:received');

    // this.app.getRootNav().popToRoot();
    setTimeout(() => {
      this.app.getRootNav().setRoot(LoginPage);
    }, 100);

  }
  createshop(e) {
    this.navCtrl.push(ListshopPage);
  }

  loginModal(e) {
    let loginModal = this.modalControl.create(LoginPage);
    loginModal.present();
  }

  editProfile(e) {
    this.navCtrl.push(EditProfilePage);
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
