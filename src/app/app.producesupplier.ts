import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = 'https://localhost:44353/api/ProduceSupply';


@Component({
    templateUrl:'./app.producesupplier.html',
    styleUrls: ['./app.component.css']
})

export class ProduceSupplierComponent {
    _psArray!: Array<any>;
    _errorMessage: String = "";
    _singleQty: number = 0;
    _singlepPId: number = 0;
    _singleSId: number = 0;
    _editableQty: Number = 0;
    _editPId: Number = 0;
    _editSId: Number = 0;
    
    constructor(private http: HttpClient) {}

    ngOnInit() {
        console.log("------------------------------------------------");
        console.log("getAllProduceSuppliers base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe({
            next: data => {           
            this._psArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error: error =>{
            this._errorMessage = JSON.stringify(error);
        }
        })
    }

    getAllProductSuppliers() {
        console.log("------------------------------------------------");
        console.log("getAllProductSuppliers base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe({
            next: data => { 
            this._psArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error: error =>{
            this._errorMessage = JSON.stringify(error);
        }
        })
    }

    createProductSupplier(data) {
        
        let url = BASE_URL + "/create"
        console.log("------------------------------------------------");
        console.log("createProduct base url ==> [post] " +  BASE_URL + "/create");
        this.http.post('https://localhost:44353/api/ProduceSupply/create', {
            ProduceID:   data.ProduceID,
            SupplierID: data.SupplierID,
            Qty: data.Qty
        })
        .subscribe({
            next: (data) => {           
            console.log("POST call successful. Inspect response.", JSON.stringify(data));            
            this.getAllProductSuppliers();                
        },             
        error: error => { 
            console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
        }
        });

        console.log(data);
    }

    updateProductSupplier() {        
        this.http.put(BASE_URL + "/edit",
            {
                ProduceID:   this._editPId,
                SupplierID: this._editSId,
                Qty: this._editableQty,
            })
        .subscribe({
            next: (data) => {               
                console.log("PUT call successful. Inspect response.", JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllProductSuppliers();         
            },           
            error: error => {
                this._errorMessage = JSON.stringify(error);
            }
            });
    }

    getProductSupplier(pid, sid) {      
        console.log("------------------------------------------------");
        console.log("getProductSupplier base url ==> [get] " +  BASE_URL + "/" +  pid + "/" + sid);       
        let url = BASE_URL + "/" +  pid + "/" + sid        
        this.http.get<any>(url)           
            .subscribe({
                next: data => {
                this._singleQty = data.qty;
                this._singlepPId   = data.produceID;
                this._singleSId = data.supplierID;                                
        },
        error: error =>{             
                this._errorMessage = JSON.stringify(error);
        }
        })
    }

    deleteProductSupplier(event, pid,sid) {
        event.preventDefault();  
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let url = BASE_URL + "/" + pid + "/" + sid;
        console.log("------------------------------------------------");
        console.log("deleteProduct base url ==> [delete] " + BASE_URL + "/" + pid + "/" + sid);    
        this.http.delete(url, httpOptions).subscribe({         
          next: (data) => {            
            this._errorMessage = data["errorMessage"];
            this.getAllProductSuppliers();
          },          
          error: error => {
            this._errorMessage = JSON.stringify(error);
          }
        });
      }

}