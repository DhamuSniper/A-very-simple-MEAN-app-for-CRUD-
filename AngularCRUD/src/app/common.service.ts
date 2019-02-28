import { Injectable } from '@angular/core';   
import {Http,Response } from '@angular/http';   
import { map } from "rxjs/operators";
import 'rxjs/Rx';

@Injectable()  
export class CommonService {  
  
  constructor(private http: Http) { }  
  
  saveuser(user){      
    return this.http.post('http://localhost:3000/api/saveuser/', user)  
            .pipe(map((response: Response) =>response.json())    )          
  } 
  
  getuser(){       
    return this.http.get('http://localhost:3000/api/getuser/')  
            .pipe(map((response: Response) => response.json())    )        
  }  
 deleteuser(id){   
    return this.http.post('http://localhost:3000/api/deleteuser/',{'id': id})  
            .pipe(map((response: Response) =>response.json())   )            
  }  
  
} 