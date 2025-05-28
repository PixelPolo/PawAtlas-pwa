import { Component, EventEmitter, inject, Output } from '@angular/core';
import { DesignService } from '../../services/design/design.service';
import { dangerCategories, interestCategories } from '../../models/categories';

@Component({
  selector: 'app-marker-menu',
  standalone: true,
  imports: [],
  templateUrl: './marker-menu.component.html',
  styleUrl: './marker-menu.component.css',
})
export class MarkerMenuComponent {
  // ******************
  // ***** FIELDS *****
  // ******************

  // Services
  public designService = inject(DesignService);

  // Outputs to the parent component
  @Output() myMarkersChange = new EventEmitter<boolean>();
  @Output() interestsChange = new EventEmitter<boolean>();
  @Output() dangersChange = new EventEmitter<boolean>();
  @Output() categoryChange = new EventEmitter<string[]>();

  // Categories
  public interestCategories = interestCategories;
  public dangerCategories = dangerCategories;
  public interestChecked: boolean = true;
  public dangerChecked: boolean = true;
  public choosenCategory: string[] = [];

  // ***********************
  // ***** CONSTRUCTOR *****
  // ***********************

  constructor() {}

  // *******************
  // ***** METHODS *****
  // *******************

  // ***** ANGULAR LIFECYCLE HOOKS *****

  // On init lifecycle hook
  ngOnInit(): void {
    this.toogleAllCategories();
    this.categoryChange.emit(this.choosenCategory);
  }

  // Choose all categories by default
  private toogleAllCategories(): void {
    this.interestCategories.forEach((category) => {
      this.choosenCategory.push(category.value);
    });
    this.dangerCategories.forEach((category) => {
      this.choosenCategory.push(category.value);
    });
  }

  // ***** METHODS *****

  // On my markers check
  onMyMarkersChange(event: any): void {
    const checkbox = event.target as HTMLInputElement;
    this.myMarkersChange.emit(checkbox.checked);
  }

  // On interest check
  onInterestChange(event: any): void {
    const checkbox = event.target as HTMLInputElement;
    this.interestChecked = checkbox.checked;
    this.interestsChange.emit(checkbox.checked);
  }

  // On danger check
  onDangerChange(event: any): void {
    const checkbox = event.target as HTMLInputElement;
    this.dangerChecked = checkbox.checked;
    this.dangersChange.emit(checkbox.checked);
  }

  // On category change
  onCategoryChange(event: Event, categoryValue: string): void {
    // Get the checkbox element and check if it is checked
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      // Add the category if checked and not already in the list
      if (!this.choosenCategory.includes(categoryValue)) {
        this.choosenCategory.push(categoryValue);
      }
    } else {
      // Remove the category if unchecked and in the list
      if (this.choosenCategory.includes(categoryValue)) {
        this.choosenCategory = this.choosenCategory.filter(
          (category) => category !== categoryValue
        );
      }
    }
    // Emit the event to the parent component with the new category list
    this.categoryChange.emit(this.choosenCategory);
  }

  // Get icon for the category
  getIcon(category: string): string {
    return this.designService.getIconURL(category);
  }
}
