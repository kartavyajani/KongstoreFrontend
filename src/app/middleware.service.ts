import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {


  constructor(private http:HttpClient) { }

  readonly BaseURL = "http://192.168.11.28:8082/";

  registerUser(formdata:FormData): Observable<Object>{
    return this.http.post(this.BaseURL +'users/register', formdata);
  }
  // loginUser(formdata:FormData): Observable<Object>{
  //   return this.http.post(this.BaseURL +'users/login', formdata);
  // }
  loginUser(formdata:FormData): Observable<Object>{
    return this.http.post(this.BaseURL +'consumer/login', formdata);
  }

 logoutUser(formdata:FormData): Observable<Object>{
    return this.http.post(this.BaseURL +'consumer/logout', formdata,{ responseType: 'text'});
  }
  
  changePassword(formdata:FormData): Observable<Object>{
    return this.http.post(this.BaseURL +'consumer/changePassword', formdata,{ responseType: 'text'});
  }
  generateToken(formdata:any): Observable<Object>{
    return this.http.post(this.BaseURL + 'api/generateAuthToken', formdata);
  }


  test(formdata:FormData): Observable<Object>{
    console.log("test called");
    return this.http.post('http://192.168.11.172:8000/demopost', formdata,{ responseType: 'text'});
  }

  getServices(): Observable<Object>{
    return this.http.get(this.BaseURL +'api/getallservice');
  }
  getServiceDetails(id: number): Observable<Object>{  
   return this.http.get(this.BaseURL + 'api/getsingleservice' + '/' + id);
  }
  getRouteByServiceId(id: number): Observable<Object>{
    return this.http.get(this.BaseURL + 'api/getsingleroute' + '/' + id);
   }
   getTargetUrlByServiceId(id: number): Observable<Object>{
    return this.http.get(this.BaseURL + 'api/targeturls' + '/' + id);
   }
  
  callUrl(formdata:any,method:any,url:any): Observable<Object>{
    return this.http.post(this.BaseURL +'api/targeturls'+'?url='+url+'&method='+method, formdata);
  }
  
  getTags(): Observable<Object>{
    return this.http.get(this.BaseURL + 'api/getTags' );
   }
   insertSwaggerfile(): Observable<Object>{
    return this.http.get(this.BaseURL + 'api/insertintoswagger' );
   }

   getServicebytag(tagName:any): Observable<Object>{
    return this.http.get(this.BaseURL + 'api/getServicesByTag'+'?tagName='+tagName );
   }
 
}
