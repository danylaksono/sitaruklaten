import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, 
  MatInputModule, 
  MatTabsModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatTooltipModule,
  MatRippleModule,
  MatExpansionModule,
  MatTableModule,
  MatSliderModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  
  
  //MatSort,
  //MatTableDataSource

} from '@angular/material';

import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule,
    MatDialogModule,
    DragDropModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatRippleModule,
    MatExpansionModule,
    MatTableModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSlideToggleModule,
    
    
    //MatSort,
    //MatTableDataSource
    
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule, 
    MatIconModule, 
    MatListModule,
    MatDialogModule,
    DragDropModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatRippleModule,
    MatExpansionModule,
    MatTableModule,
    MatSliderModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSlideToggleModule,
    
    //MatTableDataSource
  ]
})
export class MaterialModule { }
