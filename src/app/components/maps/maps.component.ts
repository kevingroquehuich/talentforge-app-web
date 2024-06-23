import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    const coordenadas: L.LatLngExpression = [-12.040190, -75.192734];
    const map = L.map('map').setView(coordenadas, 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var iconRed = L.icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
      iconSize: [40, 56],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var marker = L.marker(coordenadas, { icon: iconRed }).addTo(map).bindPopup("TalentForge esta aquí");
    marker.openPopup();

    map.dragging.disable();   // Desactivar el desplazamiento (pan)
    map.touchZoom.disable();  // Desactivar el zoom con gestos táctiles
    map.doubleClickZoom.disable();  // Desactivar el zoom al doble clic
    map.scrollWheelZoom.disable();  // Desactivar el zoom con la rueda del ratón
    map.boxZoom.disable();    // Desactivar el zoom con el cuadro de selección
    map.keyboard.disable();
  }

}
