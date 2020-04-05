import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Data } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  saveToken(jwt: string) {
    localStorage.setItem('token',jwt);
    this.jwt=jwt;
    this.ParseJwt();
  }
 public ParseJwt() {
  
  let jwthelper=new JwtHelperService();
  this.username=jwthelper.decodeToken(this.jwt).obj;
  this.roles=jwthelper.decodeToken(this.jwt).roles;


  }
  public loadtoken()
  {
    this.jwt=localStorage.getItem('token');
    this.ParseJwt();

  }
  logOut()
  {
    localStorage.removeItem('token');
    this.jwt=undefined;
    this.roles=undefined;
    this.username=undefined;
  }
 public isAdmin(){
return this.roles.indexOf('ADMIN')>=0;//si sup à 0
  }
  public isUser(){
    return this.roles.indexOf('USER')>=0;//si sup à 0
      }
  
  isAuthan(){
    return this.roles && (this.isAdmin || this.isUser);
  }
public host:String="http://localhost:8095"
public jwt;
public username:String;
public roles:Array<String>;

  constructor(private http:HttpClient) {
 }
 public login(data)
 {
  return this.http.post(this.host+"/login",data,{observe:'response'});
 }
  public getallusers()
   {
   return this.http.get(this.host+"/appUsers");
   }
   loadUserByUsername(url)
   {
     return this.http.get(url);
   }
   public saveUser(data)
   {
    //this.loadtoken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.jwt
      })
    };
    
    console.log(this.jwt)
    return this.http.post(this.host+"/appUsers",data,httpOptions);
   }
   public getallcenters(url)
   {
    return this.http.get(url);
   }
   public getallcenter()
   {
    return this.http.get(this.host+"/centreLists?page=0&size=2000000");
   }
}
