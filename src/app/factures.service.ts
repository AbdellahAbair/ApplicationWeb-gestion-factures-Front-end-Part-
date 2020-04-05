import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturesService {

  public host:String="http://localhost:8095"

  constructor(private http:HttpClient) { }
  
  public getallbills(url)
   {
   return this.http.get(url);
   }
   public getbill(url)
   {
     return this.http.get(this.host+url)
   }
}
