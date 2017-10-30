import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ShopModel } from '@ngcommerce/core';

/**
 * Generated class for the CreateshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createshop',
  templateUrl: 'createshop.html',
})
export class CreateshopPage {
  item = {} as ShopModel;
  pImages: Array<string> = [];
  resImg: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if (this.navParams.data) {
      this.item = JSON.parse(JSON.stringify(this.navParams.data));
      this.pImages = this.item.image ? [this.item.image] : [];
      this.resImg = this.item.image ? this.item.image : '';
    }
  }
  resImageEvent(e) {
    this.resImg = e[0] ? e[0] : "";
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateshopPage');
  }

  createShop(data) {
    data.image = this.resImg;
    this.viewCtrl.dismiss(data);
  }
  canceldissmis() {
    this.viewCtrl.dismiss();
  }

}
