import { ToastController,Platform,LoadingController,AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  en : string = "cellfunds_language";
  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
    console.log('Hello UtilsProvider Provider');
  }
  loading(message?){
    let l = this.loadingCtrl.create({
      content: message?message:"loading",
      spinner: 'crescent'
    });  
    l.present();    
    return l;
  }
  toast(message?,position?,delay?){
    let t = this.toastCtrl.create({
  	    message: message,
  	    duration: delay||3000,
  	    position: position||(this.platform.is("ios")?'bottom':'top')
  	});
  	t.present();
  }
  cleanmobile(str:string){
    if(str){
      while(str.indexOf(" ")>=0) str = str.replace(" ","");
      while(str.indexOf("+1(")>=0) str = str.replace("+1(","");
      while(str.indexOf("+")>=0) str = str.replace("+","");
      while(str.indexOf(")")>=0) str = str.replace(")","");
      while(str.indexOf("-")>=0) str = str.replace("-","");
      if(str.substr(0,1) == "1") str = str.substr(1,str.length);
      return str.trim();
    }else return "";
  }
  reformmobile(str){
    let newstr = ""; 
    if(str){
        str = this.cleanmobile(str);
      for(let i=0;i<str.length;i++){
        switch (i) {
          case 0: newstr += "+1 ("; break;
          case 3: newstr += ") "; break;
          case 6: newstr += "-"; break;
        }
        newstr += str[i];
      }
    }
    return newstr;
  }
  boxpop(title?,subtitle?,buttons?,cs?){
    let alert = this.alertCtrl.create({
      cssClass: cs?cs:null,
      title: title,
      subTitle: subtitle,
      buttons: buttons?buttons:['Dismiss']
    });
    alert.present();
  }
}
