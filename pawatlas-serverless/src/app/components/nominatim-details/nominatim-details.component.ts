import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NominatimService } from '../../services/nominatim/nominatim.service';
import { DesignService } from '../../services/design/design.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-nominatim-details',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './nominatim-details.component.html',
  styleUrl: './nominatim-details.component.css',
})
export class NominatimDetailsComponent implements OnInit {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Services
  private activatedRoute = inject(ActivatedRoute);
  private nominatimService = inject(NominatimService);
  public designService = inject(DesignService);
  private router = inject(Router);

  // Query params
  public longitude: Number | undefined;
  public latitude: Number | undefined;
  public markerID: string | undefined;

  // Location details
  public locationDetails: any | null;

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************
  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // Initialize the component
  ngOnInit(): void {
    this.subscribeToQueryParams();
  }

  // Unsubscribe from the observables
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Subscribe to query params
  private subscribeToQueryParams(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.latitude = params['lat'];
        this.longitude = params['lon'];
        this.markerID = params['markerID'];
        // Get location details
        this.getLocationDetails();
      })
    );
  }

  // Get location details from the nominatim service
  private getLocationDetails(): void {
    if (this.latitude !== undefined && this.longitude !== undefined) {
      this.subscription.add(
        this.nominatimService
          .getLocationDetails(this.latitude, this.longitude)
          .subscribe((locationDetails) => {
            // Save the location details
            this.locationDetails = locationDetails;
            console.log(this.locationDetails);
          })
      );
    }
  }

  // ***** METHODS *****

  // Back to map
  public backToMap(): void {
    // Redirect to the map with the marker as a query parameter
    this.router.navigate(['/map'], {
      queryParams: { markerId: this.markerID },
    });
  }

  // ***** TEST DATA *****

  public locationDetailsTest = {
    place_id: 77519781,
    licence:
      'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
    osm_type: 'way',
    osm_id: 72498630,
    lat: '46.4783341',
    lon: '6.8980099',
    class: 'highway',
    type: 'residential',
    place_rank: 26,
    importance: 0.10000999999999993,
    addresstype: 'road',
    name: 'Chemin du Crépon',
    display_name:
      'Chemin du Crépon, Chevalleyres, Saint-Légier-La Chiésaz, Blonay - Saint-Légier, District de la Riviera-Pays-d’Enhaut, Vaud, 1807, Suisse',
    address: {
      road: 'Chemin du Crépon',
      hamlet: 'Chevalleyres',
      village: 'Saint-Légier-La Chiésaz',
      county: 'District de la Riviera-Pays-d’Enhaut',
      state: 'Vaud',
      'ISO3166-2-lvl4': 'CH-VD',
      postcode: '1807',
      country: 'Suisse',
      country_code: 'ch',
    },
    boundingbox: ['46.4770786', '46.4799668', '6.8928551', '6.8999334'],
  };
}
