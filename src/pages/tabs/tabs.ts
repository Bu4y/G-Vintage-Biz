import { NotificationPage } from '../notification/notification';
import { ProductPage } from '../product/product';
import { OrderPage } from '../order/order';
import { AccountPage } from '../account/account';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OrderPage;
  tab3Root = ProductPage;
  tab4Root = NotificationPage;
  tab5Root = AccountPage;
  
  constructor() {

  }
}
