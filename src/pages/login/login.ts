import { TabsPage } from '../tabs/tabs';
import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AuthenService, SignupModel, SigninModel } from "@ngcommerce/core";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook, public authenService: AuthenService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  user = {} as SignupModel;
  credential: any = {};

  login() {
    this.authenService.signIn(this.credential).then(data => {
      this.navCtrl.push(TabsPage);

     // alert(JSON.stringify(data));
    }).catch(e => {
      alert(JSON.stringify(e));

    });
  }
  loginfb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) =>
        this.fb.api('me?fields=email,id,first_name,last_name', null).then((res: FacebookLoginResponse) =>
          this.registerFb(res))
          .catch(e => {
            alert(JSON.stringify(e));
          })
      )
      // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  registerFb(data) {
    this.navCtrl.push(RegisterPage, data);
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
