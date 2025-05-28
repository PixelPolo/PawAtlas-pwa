import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../../../models/database/category.model';
import { CategoryService } from '../../../services/database/category/category.service';
import { TypeService } from '../../../services/database/type/type.service';
import { Type } from '../../../../models/database/type.model';
import { DesignService } from '../../../services/design/design.service';

@Component({
  selector: 'app-marker-menu',
  standalone: true,
  imports: [],
  templateUrl: './marker-menu.component.html',
  styleUrl: './marker-menu.component.css',
})
export class MarkerMenuComponent implements OnInit {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Subject to unsubscribe from the observables
  private subscription: Subscription = new Subscription();

  // Outputs to the parent component
  @Output() myMarkersChange = new EventEmitter<boolean>();
  @Output() categoryChange = new EventEmitter<Category[]>();

  // Services
  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  public designService = inject(DesignService);

  public types: Type[] = [];
  public categories: Category[] = [];
  public selectedType: Type[] = [];
  public filteredCategories: Category[] = [];
  public selectedCategories: Category[] = [];

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // On init
  public ngOnInit(): void {
    this.initTypes();
    this.initCategories();
  }

  // Initialize the types
  private initTypes(): void {
    this.subscription.add(
      this.typeService.getTypes().subscribe({
        next: (types) => {
          this.types = types;
          // Select all types by default
          this.selectedType = types;
        },
      })
    );
  }

  // Initialize the categories
  private initCategories(): void {
    this.subscription.add(
      this.categoryService.getCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
          // Select all categories by default
          this.filteredCategories = categories;
          this.selectedCategories = categories;
          // Emit the selected categories
          this.categoryChange.emit(this.selectedCategories);
        },
      })
    );
  }

  // ***** USER INTERACTION *****

  // On my markers check
  public onMyMarkersChange(event: any): void {
    const checkbox = event.target as HTMLInputElement;
    this.myMarkersChange.emit(checkbox.checked);
  }

  // On types change
  public onTypeChange(event: any): void {
    const checkbox = event.target as HTMLInputElement;
    // Find the type
    const type: Type | undefined = this.types.find(
      (t) => t.typeID === checkbox.id
    );
    // If the checkbox is checked and the type exists,
    // add it to the selected types
    if (checkbox.checked && type) {
      this.selectedType.push(type);
    } else {
      this.selectedType = this.selectedType.filter((t) => t !== type);
    }
    // Filter the categories based on the selected types
    this.filteredCategories = this.categories.filter((c) =>
      this.selectedType.some((t) => t.typeID === c.typeID)
    );
    // Select all categories by default according to the selected types
    this.selectedCategories = this.categories.filter((c) =>
      this.selectedType.some((t) => t.typeID === c.typeID)
    );
    this.categoryChange.emit(this.selectedCategories);
  }

  // On category change
  public onCategoryChange(event: any): void {
    const checkbox = event.target as HTMLInputElement;
    // Find the category
    const category: Category | undefined = this.categories.find(
      (c) => c.categoryID === checkbox.id
    );
    // If the checkbox is checked and the category exists,
    // add it to the selected categories
    if (checkbox.checked && category) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    }
    this.categoryChange.emit(this.selectedCategories);
  }
}
