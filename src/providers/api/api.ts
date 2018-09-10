import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SessionProvider } from '../session/session';
import { UtilsProvider } from '../utils/utils';

let api_url = location.hostname?"/api/":"http://yourapiurlhere";
let zipcodeurl = location.hostname?"/zipcodeurl/":"https://zip.getziptastic.com/v2/US/";
let countryurl = location.hostname?"/country/":'https://restcountries.eu/rest/v2/';

@Injectable()
export class ApiProvider {
  login_attemts : any = 5;
  login_attemts_count : number = 0;
  login_attemts_maxtime : any = 5;
  login_attemts_time : any = this.session.login_attempts_time();
  login_attemts_timeout : any;
  session_maxtime : any = 30;
  session_time : any;
  session_timeout :any;

  constructor(
    public http: HttpClient,
    public session:SessionProvider,
    public events:Events,
    public utils: UtilsProvider
    ) {
    console.log('Hello ApiProvider Provider');
  }
  reformparam(params:any){
    if(typeof params === "object"){
      let paramarrs = [];
      for(let i in params){
        paramarrs.push(i + "=" +params[i]);
      }
      return paramarrs.join("&");
    }else{
      return params;
    }
  }
  get(cntl,params){
    return new Promise((resolve, reject) => {
        if(typeof params == "object"){
          let tmp = params;
          let tmp2 = [];
          for(let k in tmp){
            tmp2.push(k + "=" + encodeURIComponent(tmp[k]));
          }
          params = "&" + tmp2.join("&");
        }
        this.http.get(api_url+cntl+"?return_mode=json"+params)
        .subscribe((res:any) =>{
          this.settime();
          var resdata = res;
          if(!this.isjson(res)){
            reject("Unable to process request");
          }else if(resdata.ResponseCode == "0000") resolve(resdata.ResponseMessage);
          else{
             if(resdata.ResponseMessage.message=="Session expired") this.events.publish('user:logout');
             else{
               reject(resdata.ResponseMessage.message);
             }
           }
        }, (err:any) => {
          console.log(JSON.stringify(err));
          reject("Unable to process request");
        });
    });
  }
  post(pmethod,params){
    return new Promise((resolve, reject) => {
        this.settime();
        let headers = new HttpHeaders();
            headers = headers.set('Accept',"application/json");
            headers = headers.set('Content-Type',"application/x-www-form-urlencoded");
        if(typeof params == "object"){
          let tmp = params;
          let tmp2 = [];
          for(let k in tmp){
            tmp2.push(k + "=" + encodeURIComponent(tmp[k]));
          }
          params = "return_mode=json&" + tmp2.join("&");
        }    
        this.http.post(api_url+pmethod,params,{headers})
          .subscribe((res:any) =>{
            var resdata = res;
            if(!this.isjson(res)){
              reject("Unable to process transaction");
            }else if(resdata.ResponseCode == "0000") resolve(resdata.ResponseMessage);
            else{
               reject(resdata.ResponseMessage);
               if(resdata.ResponseMessage.message=="Session expired") this.events.publish('user:logout');
             }
          }, (err:any) => {
            reject("Unable to process transaction");
          });    
    });
  }
  settime(){
    if(typeof this.session.get("session_id") != "undefined"){
      // console.log(this.session.get("session_id"));
      clearTimeout(this.session_timeout);
      let ct = +new Date();
      this.session_time = ct + (1000*60*(this.session_maxtime));
      this.session_timeout = setTimeout(()=>{
        this.utils.boxpop("Session Expired","Your session has ended. Please log in again.");
        this.events.publish('user:logout');
      },(this.session_time - ct));
    }
  }
  isjson(str?){
    let ret = false;
    if(ret) ret = /^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
    return str;
  }
}
