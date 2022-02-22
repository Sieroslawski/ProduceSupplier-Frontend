import { Component } from '@angular/core';

@Component({
  selector: 'app-root', 
  styleUrls: ['./app.component.css'],
  template:     
  `
  <header>
  <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
  </header>  
    <nav class="navbar navbar-expand-lg navbar-light bg-faded">
    <a class="navbar-brand" href="#"><img src="../assets/logo.JPG" width="100" height="70" class="d-inline-block align-top" alt=""/></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
        <li class="nav-item active">         
          <a routerLink="/produce" routerLinkActive="active">Produce</a> |
          <a routerLink="/supplier" routerLinkActive="active">Supplier</a> |
          <a routerLink="/producesupplier" routerLinkActive="active">ProduceSupplier</a>   
        </li>
       
     </ul>
     <div class="theform">
     <form class="form-inline my-2 my-lg-0">
     <i class="fa-brands fa-github fa-lg"></i>
     <i class="fa-brands fa-twitter fa-lg"></i>
     <i class="fab fa-discord fa-lg"></i>  
     <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Download</button>     
   </form>
   </div>
    </div>  
    </nav>
    <!-- Where router should display a view -->
    <router-outlet></router-outlet>`

})
export class AppComponent {
  title = 'day2AngularAppB';
}
