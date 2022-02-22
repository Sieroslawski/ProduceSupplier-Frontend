import { Component} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = 'https://localhost:44353/api/Produce';

@Component({    
    templateUrl:'./app.produce.html',
    styleUrls: ['./app.component.css']
})

export class ProduceComponent { 
    _productsArray!: Array<any>;   
    _errorMessage:String = "";
    _description:String = "";
    _singleProductName: string = "";
    _singleProductNumber : number = 0;
    _editableDescription:String="";
    _editId:Number = 0;
    event: {};
    displayedColumns: string[] = ['id, description'];
    dataSource = this._productsArray;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        console.log("------------------------------------------------");
        console.log("getAllProducts base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url).subscribe(data => {
            // Get data and wait for result.            
            this._productsArray = data;
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"]; 
        },
        error =>{
            // Let user know about the error.
            this._errorMessage = JSON.stringify(error);
        })
    }
    

    getAllProducts() {
        console.log("------------------------------------------------");
        console.log("getAllProducts base url ==> [get<any>] " +  BASE_URL);

        let url = BASE_URL
        this.http.get<any>(url)
        .subscribe({
            next: data => {
            // Get data and wait for result.            
            this._productsArray = data;            
            this._errorMessage = data["errorMessage"]; 
        },
        error: error => {
            // Let user know about the error.
            this._errorMessage = JSON.stringify(error);
        }
        })
    }

    getProduct(id) {
        console.log("------------------------------------------------");
        console.log("getProduct base url ==> [get] " +  BASE_URL + "/" +  id);

        let url = BASE_URL + "/" + id;
        this.http.get<any>(url)
            // Get data and wait for result.
            .subscribe({
                next: data => {          
                this._singleProductName   = data.description;
                this._singleProductNumber = data.produceID;
        },
        error: error =>{
              // Let user know about the error.
                this._errorMessage = JSON.stringify(error);
        }
        })
    }
    
    createProduct(data) {
        let url = BASE_URL + "/create"
        console.log("------------------------------------------------");
        console.log("createProduct base url ==> [post] " +  BASE_URL + "/create");

        this.http.post('https://localhost:44353/api/Produce/create', data)
        .subscribe({
            next: (data) => {
            // Data is received from the post request.           
            // Inspect the data to know how to parse it.
            console.log("POST call successful. Inspect response.", JSON.stringify(data));
            this._errorMessage = data["errorMessage"];
            this.getAllProducts();
                
        },             
        error: error => { // An error occurred. Data is not received.
            console.log(data + " ==> 3, error ==> " + JSON.stringify(error));
            //this._errorMessage = JSON.stringify(error);                
        }
        });       
    }

      updateProduct() {       
        this.http.put(BASE_URL + "/edit",
            {
                ProduceID:   this._editId,
                Description: this._editableDescription,
            })
        .subscribe({
            // Data is received from the post request.
           next: (data) => {
                // Inspect the data to know how to parse it.
                console.log("PUT call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllProducts();         
            },
            // An error occurred. Data is not received. 
            error: error => {
                this._errorMessage = JSON.stringify(error);
            }
            });
    }

    deleteProduct(event, id) { 
        event.preventDefault();     
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        let url = BASE_URL + "/" + id;
        console.log("------------------------------------------------");
        console.log("deleteProduct base url ==> [delete] " + BASE_URL + "/" + id);
    
        this.http.delete(url, httpOptions).subscribe({
          // Data is received from the post request.
          next: (data) => {                                   
            this._errorMessage = data["errorMessage"];
            this.getAllProducts();
          },
          // An error occurred. Data is not received. 
          error: error => {
            this._errorMessage = JSON.stringify(error);
          }
        });
      }

}
