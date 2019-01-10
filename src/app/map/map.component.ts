import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  screenHeight = 1000;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    console.log(this.screenHeight);
    
 }
  url = 'https://harta-isi.firebaseapp.com/';

  ngOnInit() {
    // first, we use Dojo's loader to require the map class
   
}

  constructor() {
    this.onResize();
   }

}
