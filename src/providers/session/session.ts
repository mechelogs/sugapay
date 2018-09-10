import { Injectable } from '@angular/core';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {
  session_name : string = "cellfunds_session";
  session_remember_username : string = "cellfunds_remember_username";
  session_remember_pin : string = "cellfunds_remember_pin";
  session_remember_name : string = "cellfunds_remember";
  session_fingerprint : string = "cellfunds_fingerprint";
  session_login_attemts_time : string = "cellfunds_login_attemts_time";
  session_login_attemts_count : string = "cellfunds_login_attemts_count";
  constructor() {
    console.log('Hello SessionProvider Provider');
  }
  set(item,value){
     let sess = this.parsedata();
     sess[item] = value;
     localStorage.setItem(this.session_name,JSON.stringify(sess)); 
  }
  parsedata(){
    return JSON.parse(localStorage.getItem(this.session_name)||"{}");
  }
  get(item){
     let sess = this.parsedata();
     return sess[item]; 
  }
  all(){
    return this.parsedata();
  }
  clear(){
    localStorage.setItem(this.session_name,"{}"); 
  }
  isremember(){
    return !!Number(localStorage.getItem(this.session_remember_name)); 
  }
  remember_data(){
    return {
      username:localStorage.getItem(this.session_remember_username),
      password:localStorage.getItem(this.session_remember_pin),
      remember:!!Number(localStorage.getItem(this.session_remember_name))
    }; 
  }
  remember(status,username,pin){
    localStorage.setItem(this.session_remember_username,(status?username:'')); 
    localStorage.setItem(this.session_remember_pin,(pin?pin:'')); 
    localStorage.setItem(this.session_remember_name,(status?"1":"0")); 
  }
  get_fingerprint(){
     let sess = JSON.parse(localStorage.getItem(this.session_fingerprint)||"{}");
     return sess; 
  }
  set_fingerprint(f){
     let sess = localStorage.setItem(this.session_fingerprint,f);
     return sess; 
  }
  delete_fingerprint(){
     let sess = localStorage.setItem(this.session_fingerprint,"");
     return sess; 
  }
  login_attempts_time(){
    return localStorage.getItem(this.session_login_attemts_time); 
  }
  login_attempts_time_set(t){
    return localStorage.setItem(this.session_login_attemts_time,t); 
  }
  login_attemts_count(){
    return localStorage.getItem(this.session_login_attemts_count); 
  }
  login_attemts_count_set(t){
    return localStorage.setItem(this.session_login_attemts_count,t); 
  }
}
