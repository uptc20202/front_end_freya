import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {

  showMap(location: string): void {
    // Lógica para mostrar el mapa de Google Maps (simulado)
    console.log(`Mostrando mapa para: ${location}`);
    // Puedes agregar lógica para cambiar la vista del mapa aquí
  }
}
