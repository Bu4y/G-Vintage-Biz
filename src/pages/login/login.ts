import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AuthenService, SignupModel } from "@ngcommerce/core";
import { OneSignal } from '@ionic-native/onesignal';
import { LoadingProvider } from '../../providers/loading/loading';
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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: Facebook,
    public authenService: AuthenService,
    public loadingCtrl: LoadingProvider,
    public viewCtrl: ViewController,
    public oneSignal: OneSignal,
    public platform: Platform
  ) {
  }
  user = {} as SignupModel;
  credential: any = {};

  login() {

    window.localStorage.removeItem('shop');
    window.localStorage.removeItem('jjuserbuyer');
    
    this.loadingCtrl.onLoading();
    this.authenService.signIn(this.credential).then(data => {
      window.localStorage.setItem('jjuserbuyer', JSON.stringify(data));

      if (this.platform.is('cordova')) {
        this.oneSignal.getIds().then((data) => {
          this.authenService.pushNotificationUser({ id: data.userId });
        });
      }

      this.loadingCtrl.dismiss();
      this.navCtrl.push(TabsPage);      
      this.viewCtrl.dismiss();
      

      // alert(JSON.stringify(data));
    }).catch(e => {
      this.loadingCtrl.dismiss();
      alert(JSON.parse(e._body).message);
    });
  }
  loginfb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) =>
        this.fb.api('me?fields=email,id,first_name,last_name', null).then((res: FacebookLoginResponse) =>
          this.registerFb(res))
          .catch(e => {
            alert(JSON.parse(e._body).message);
          })
      )
      // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
      .catch(e => {
        alert(JSON.parse(e._body).message);
      });
  }

  registerFb(data) {
    this.navCtrl.push(RegisterPage, data);
  }

  register() {
    this.navCtrl.push(RegisterPage);


  }
}
