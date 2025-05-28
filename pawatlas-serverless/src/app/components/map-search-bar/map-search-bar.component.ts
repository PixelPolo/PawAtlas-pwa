import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NominatimService } from '../../services/nominatim/nominatim.service';
import { DesignService } from '../../services/design/design.service';
import L from 'leaflet';

@Component({
  selector: 'app-map-search-bar',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './map-search-bar.component.html',
  styleUrl: './map-search-bar.component.css',
})
export class MapSearchBarComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private nominatimService = inject(NominatimService);
  public designService = inject(DesignService);

  // Map
  @Input() map!: L.Map;

  // Fontawsome icons
  public faMagnifyingGlass = faMagnifyingGlass;

  // Search form for the nominatim API
  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  // Boolean to track if the search results are displayed
  public searchResultsDisplayed: boolean = false;

  // Search results from the nominatim API
  searchResults: any[] = [];

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // On search event
  public onSearch(): void {
    // Toogle the search results boolean
    this.searchResultsDisplayed = true;
    // Get the search value from the form
    const searchValue = this.searchForm.value.search;
    // Get the search locations from the nominatim API
    this.subscription.add(
      this.nominatimService
        .searchLocations(searchValue!)
        .subscribe((locations) => {
          this.searchResults = locations;
        })
    );
  }

  // On search reset event
  public onSearchReset(): void {
    this.searchResultsDisplayed = false;
  }

  // On search result click event
  public onSearchResultClick(location: any): void {
    // Toogle the search results boolean
    this.searchResultsDisplayed = false;
    // Create a popup with the location name and open it
    const popup = L.popup().setLatLng([location.lat, location.lon]);
    popup.setContent(location.name);
    popup.openOn(this.map);
    // Set the view to the location
    this.map.setView([location.lat, location.lon], 14);
  }
}
