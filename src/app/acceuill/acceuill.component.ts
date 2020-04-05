import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FacturesService } from '../factures.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-acceuill',
  templateUrl: './acceuill.component.html',
  styleUrls: ['./acceuill.component.css']
})
@Injectable({providedIn: "root"})
export class AcceuillComponent implements OnInit {


  OctoForm = new FormGroup({
    date  :new FormControl(''),
    code_exp  :new FormControl(''),
    code_clt  :new FormControl(''),
    num_fac  :new FormControl(''),
    cars  :new FormControl(''),
    mail  :new FormControl(''),
    commentaires  :new FormControl('')
  });
  
public hide:boolean;



  constructor(private route:Router,private x:AppComponent,private facture:FacturesService) { 
   
this.hide=false;

  }
  public host:String="http://localhost:8095";
  public bills:any;
  public list:any;
  getData(url){
    
    this.facture.getallbills(url).subscribe(res => { 
      
    this.bills=res;
      
    },err => {
       console.log("err");
      } 
    );
    
}
  ngOnInit() {
   
    let url=this.host+"/factures";
     
       this.facture.getallbills(url).subscribe(data=>{
         let y:any=data;
         let url=this.host+"/factures?page=0&size="+y.page.totalElements;
         console.log(url)
         this.getData(url);
         })
    
  }
 public effacer()
  {
   
    this.OctoForm.get('date').setValue("");
    this.OctoForm.get('mail').setValue("");
    this.OctoForm.get('code_exp').setValue("");
    this.OctoForm.get('code_clt').setValue("");
    this.OctoForm.get('num_fac').setValue("");
    this.OctoForm.get('cars').setValue("");
    this.OctoForm.get('commentaires').setValue("");
   this.list="";
    this.hide=false;
  }

rechercher()
{
    let date=this.OctoForm.get('date').value;
    let mail=this.OctoForm.get('mail').value;
    let code_exp= this.OctoForm.get('code_exp').value;
    let code_clt=this.OctoForm.get('code_clt').value;
    let num_fac=this.OctoForm.get('num_fac').value;
    let cars=this.OctoForm.get('cars').value;
    let commentaires=this.OctoForm.get('commentaires').value;
    var datePipe = new DatePipe("en-US");
    date = datePipe.transform(date, 'dd/MM/yyyy');

if((!this.empty(code_exp)) && (!this.empty(code_clt)) && (!this.empty(num_fac)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndCodeCltAndNumFacAndDateFac?code_exp="+code_exp+"&code_clt="+code_clt+"&num_fac="+num_fac+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_exp)) && (!this.empty(code_clt)) && (!this.empty(num_fac)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndCodeCltAndNumFac?code_exp="+code_exp+"&code_clt="+code_clt+"&num_fac="+num_fac).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_exp)) && (!this.empty(code_clt)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndCodeCltAndDateFac?code_exp="+code_exp+"&code_clt="+code_clt+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_exp)) && (!this.empty(num_fac)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndNumFacAndDateFac?code_exp="+code_exp+"&num_fac="+num_fac+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(num_fac)) && (!this.empty(code_clt)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByNumFacAndCodeCltAndDateFac?num_fac="+num_fac+"&code_clt="+code_clt+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_exp)) && (!this.empty(code_clt)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndCodeClt?code_exp="+code_exp+"&code_clt="+code_clt).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_exp)) && (!this.empty(num_fac)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndNumFac?code_exp="+code_exp+"&num_fac="+num_fac).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_exp)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByCodeExpAndDateFac?code_exp="+code_exp+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_clt)) && (!this.empty(num_fac)))
{
 
  this.facture.getbill("/factures/search/findByCodeCltAndNumFac?code_clt="+code_clt+"&num_fac="+num_fac).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}

if((!this.empty(code_clt)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByCodeCltAndDateFac?code_clt="+code_clt+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}


if((!this.empty(num_fac)) && (!this.empty(date)))
{
 
  this.facture.getbill("/factures/search/findByNumFacAndDateFac?num_fac="+num_fac+"&date_fac="+date).subscribe(data=>{
    this.list=data;
    console.log(this.list)
 if(this.list._embedded.factures.length !=0)
    { 
     this.hide=true;
    
    }
  else
  {
    this.hide=false;
  }
   //this.bills=data;
   })
   return 0;
}





 if(!this.empty(code_exp)){
   this.facture.getbill("/factures/search/findByCodeExp?code_exp="+code_exp).subscribe(data=>{
   this.list=data;
if(this.list._embedded.factures.length !=0)
   { 
    this.hide=true;
   }
 else
 {
   this.hide=false;
 }
  //this.bills=data;
  })
 
 return 0; 
}
if(!this.empty(date)){
  this.facture.getbill("/factures/search/findByDateFac?date_fac="+date).subscribe(data=>{
  this.list=data;
if(this.list._embedded.factures.length !=0)
  { 
   this.hide=true;
  }
else
{
  this.hide=false;
}
 //this.bills=data;
 })

return 0; 
}
if(!this.empty(code_clt)){
  this.facture.getbill("/factures/search/findByCodeClt?code_clt="+code_clt).subscribe(data=>{
  this.list=data;
if(this.list._embedded.factures.length !=0)
  { 
   this.hide=true;
  }
else
{
  this.hide=false;
}
 //this.bills=data;
 })

return 0; 
}
if(!this.empty(num_fac)){
  this.facture.getbill("/factures/search/findByNumFac?num_fac="+num_fac).subscribe(data=>{
  this.list=data;
if(this.list._embedded.factures.length !=0)
  { 
   this.hide=true;
  }
else
{
  this.hide=false;
}
 //this.bills=data;
 })

return 0; 
}


}
empty(data)
{
  if(data == null|| data== ""|| data==0)
 { return true;
}
  else
  {
    return false;

}
}
rowData(selectedItem: any)
{
  console.log(selectedItem.codeExp);
  console.log(selectedItem);
  let nom_facture=selectedItem.numFac;	
  window.open("http://127.0.0.1:8080/factures/fac_"+nom_facture+".pdf", '_blank');


}


}
