import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';
import { UtilsProvider } from '../../providers/utils/utils';
import { SessionProvider } from '../../providers/session/session'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	array_ofdata :any = [
		"banana",
		"apple",
		"orange"
	];
	array_ofdata_empty :any = [];
  constructor(
  	public navCtrl: NavController,
  	public api : ApiProvider,
    public utils : UtilsProvider,
    public session : SessionProvider) {

  }
  ionViewWillEnter(){
  	this.utils.boxpop("Testing");
  	/*
	sample get sa API
  	this.api.get("api/params",{
  		r1: "someparam1",
  		r2: "someparam2",
  	}).then((res:any)=>{
  		console.log(res);
  	}).catch((err:any)=>{
  		console.log(err);
  	});*/


  	/*
	sample post sa API
  	this.api.post("api/params",{
  		r1: "someparam1",
  		r2: "someparam2",
  	}).then((res:any)=>{
  		console.log(res);
  	}).catch((err:any)=>{
  		console.log(err);
  	});*/
  }
}
