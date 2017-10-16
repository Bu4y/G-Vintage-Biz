import { ShopModel } from '@ngcommerce/core';
import { LoginPage } from './../login/login';
import { ListshopPage } from '../listshop/listshop';
import { AuthenService } from '@ngcommerce/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, LoadingController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalControl: ModalController, public menuController: MenuController, public loadingCtrl: LoadingController) {
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
  }

  ionViewWillEnter() {
    this.workaroundSideMenu();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    console.log('ionViewDidLoad AccountPage');
  }

  logout() {
    window.localStorage.removeItem('jjuserbuyer');
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
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
