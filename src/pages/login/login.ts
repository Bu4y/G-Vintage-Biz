import { TabsPage } from '../tabs/tabs';
import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AuthenService, SignupModel, SigninModel } from "@ngcommerce/core";
import { OneSignal } from '@ionic-native/onesignal';
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
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public oneSignal: OneSignal
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  user = {} as SignupModel;
  credential: any = {};

  login() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authenService.signIn(this.credential).then(data => {
      window.localStorage.setItem('jjuserbuyer', JSON.stringify(data));


      this.oneSignal.getIds().then((data) => {
        this.authenService.pushNotificationUser({ id: data.userId });
      });
      
      this.navCtrl.push(TabsPage);
      loading.dismiss();
      this.viewCtrl.dismiss();

      // alert(JSON.stringify(data));
    }).catch(e => {
      loading.dismiss();
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
