import { Component } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = 'https://localhost:44353/api/Supply';


@Component({    
    templateUrl:'./app.supplier.html',
    styleUrls: ['./app.component.css']
})

export class SupplierComponent { 

    _supplierArray!: Array<any>;   
    _errorMessage:String = "";    
    _singleSupplierName: string = "";
    _singleSupplierNumber : number = 0;
    _editableSupplierName:String="";
    _editId:Number = 0;
    event: {};

    constructor(private http: HttpClient) {}

    ngOnInit() {
        console.log("------------------------------------------------");
        console.log("getAllSuppliers base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe({
            next:data => {                        
            this._supplierArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error: error =>{            
            this._errorMessage = JSON.stringify(error);
        }
        })
    }

    getAllSuppliers() {
        console.log("------------------------------------------------");
        console.log("getAllSuppliers base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe({
            next: data => {                      
            this._supplierArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error: error =>{            
            this._errorMessage = JSON.stringify(error);
        }
        })
    }

    getSupplier(id) {
        console.log("------------------------------------------------");
        console.log("getSuppliers base url ==> [get] " +  BASE_URL + "/" + id);

        let url = BASE_URL + "/" + id;
        this.http.get<any>(url)            
            .subscribe({
                next: result => {          
                this._singleSupplierName   = result.supplierName;
                this._singleSupplierNumber = result.supplierID;
        },
        error: error =>{             
                this._errorMessage = JSON.stringify(error);
        }
        })
    }
    
    createSupplier(data) {
        let url = BASE_URL + "/create"
        console.log("------------------------------------------------");
        console.log("createSupplier base url ==> [post] " +  BASE_URL + "/create");

        this.http.post('https://localhost:44353/api/Supply/create', data)
        .subscribe({
            next: (data) => {          
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
            this.getAllSuppliers();                
        },             
        error: error => { 
            console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
        }
        });        
    }

      updateSupplier() {        
        this.http.put(BASE_URL + "/edit",
            {
                SupplierID:   this._editId,
                SupplierName: this._editableSupplierName,
            })
        .subscribe({           
            next: (data) => {                
                console.log("PUT call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllSuppliers();         
            },            
            error: error => {
                this._errorMessage = JSON.stringify(error);
            }
            });
    }

    deleteSuppliers(event, id) { 
        event.preventDefault();         
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let url = BASE_URL + "/" + id;
        console.log("------------------------------------------------");
        console.log("deleteSupplier base url ==> [delete] " + BASE_URL + "/" + id);
    
        this.http.delete(url, httpOptions).subscribe({         
          next: (data) => {                  
            this._errorMessage = data["errorMessage"];
            this.getAllSuppliers();
          },           
          error: error => {
            this._errorMessage = JSON.stringify(error);
          }
        });
      }
}
