import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-foto-fuel',
  templateUrl: './foto-fuel.page.html',
  styleUrls: ['./foto-fuel.page.scss'],
})
export class FotoFuelPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @ViewChild('slider', { read: ElementRef })slider: ElementRef;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }
}
