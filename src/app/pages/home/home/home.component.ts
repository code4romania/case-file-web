import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NgoRequest } from 'src/app/models/ngo-request.model';
import { NgosService } from 'src/app/services/ngos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email: string;
  name: string;
  ngo: string;
  message: string;
  phone: string;

  slideIndex = 1;

  constructor(private ngosService: NgosService) { }

  ngOnInit() {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    var i = 0;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        // slides[i].style.display = "none";
        slides[i].classList.add("d-none");
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
    // slides[this.slideIndex-1].style.display = "block";
    slides[this.slideIndex-1].classList.add("d-block");
    dots[this.slideIndex-1].className += " active";
  }

  sendNgoRequest() {
    var errors = false;
    if (this.name == undefined || this.name == "")
    {
      errors = true;
      alert ("Vă rugăm introduceți numele persoanei de contact pentru contul cerut.");
    }
    if (this.email == undefined || this.email == "")
    {
      errors = true;
      alert ("Vă rugăm introduceți email-ul persoanei de contact pentru contul cerut.");
    }
    if (this.ngo == undefined || this.ngo == "")
    {
      errors = true;
      alert ("Vă rugăm introduceți numele ONG-ului sau instituției pentru care trebuie creat contul.");
    }
    if (this.phone == undefined || this.phone == "")
    {
      errors = true;
      alert ("Vă rugăm introduceți numărul de telefon al persoanei de contact pentru contul cerut.");
    }

    if (!errors) {
      var request = new NgoRequest();
      request.contactPerson = this.name;
      request.email = this.email;
      request.ngoName = this.ngo;
      request.message = this.message;
      request.phone = this.phone;

      this.name = '';
      this.email = '';
      this.ngo = '';
      this.message = '';
      this.phone = '';

      this.ngosService.sendNgoRequest(request).subscribe((result)=>{
        //console.log(result);
        if (result) {
          alert ('Solicitarea a fost trimisă. După ce un administrator va aproba cererea dumneavoastră, veți primi pe mail detaliile contului. În caz că avem întrebări veți fi contactat pentru clarificare.');
        } else {
          alert ('A apărut o eroare, vă rugăm încercați din nou sau contactați-ne.')
        }

      });
    }

  }
  
}
