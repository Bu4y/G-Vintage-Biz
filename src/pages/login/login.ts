import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  user = {} ;

  login() {
    alert('jjjj');
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
    alert(JSON.stringify(data));
    // this.navCtrl.push(RegisterPage, data);
  }
}
