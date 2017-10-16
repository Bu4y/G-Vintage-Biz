import { Loading } from 'ionic-angular/es2015';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';
import { CorService, OrderModel, OrderService, ItemByOrderByShopModel, ShopModel } from "@ngcommerce/core";
import { OrderDetailPage } from '../order-detail/order-detail';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  order = {} as ItemByOrderByShopModel;
  channel: number;
  steps: Array<any> = [
    {
      value: 1,
      title: "New Order"
    },
    {
      value: 2,
      title: "Accept"
    },
    {
      value: 3,
      title: "Sent"
    }
    ,
    {
      value: 4,
      title: "Return"
    }
  ];
  shop = {} as ShopModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderService, public loadingCtrl: LoadingController, public menuController: MenuController) {
    this.channel = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewWillEnter() {
    this.getOrder();
    this.workaroundSideMenu();
  }

  getOrder() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let shop = JSON.parse(window.localStorage.getItem("shop"));
    this.shop = shop;
    this.orderService.getOrderByShop(shop._id).then((data) => {
      console.log(data);
      this.order = data;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      alert(JSON.parse(err._body).message);
    });
  }

  selectedItem(e) {
    console.log(e);
    this.navCtrl.push(OrderDetailPage, e);
    // alert(e);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  private workaroundSideMenu() {
    let leftMenu = this.menuController.get('left');
    if (leftMenu) {
      leftMenu.ionClose.subscribe(() => {
        this.shop = JSON.parse(window.localStorage.getItem('shop'));

        this.getOrder();
      });
    }
  }
}

