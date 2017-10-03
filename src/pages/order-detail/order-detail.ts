import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CorService,OrderModel,OrderService} from "@ngcommerce/core";
/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  items;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = this.navParams.data;
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

}
