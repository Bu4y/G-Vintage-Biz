import { ListshopPage } from '../listshop/listshop';
import { AuthenService } from '@ngcommerce/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  logout(){
    window.localStorage.removeItem('jjuserbuyer');
    this.user = JSON.parse(window.localStorage.getItem('jjuserbuyer'));    
  }
  createshop(e){
    this.navCtrl.push(ListshopPage);
  }
}
