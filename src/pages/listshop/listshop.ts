import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { ShopService,ShopModel} from '@ngcommerce/core';


/**
 * Generated class for the ListshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listshop',
  templateUrl: 'listshop.html',
})
export class ListshopPage {
  shop = {} as ShopModel;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,public shopService:ShopService,public modalControl : ModalController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListshopPage');


  }
  createShop(shop){
    this.shopService.getShopListByUser().then(data =>{
      console.log(data);
    })
  }

}
