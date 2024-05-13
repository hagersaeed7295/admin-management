import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortNamePipe } from './helpers/pipes/shortName.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SearchPipe } from './helpers/pipes/search.pipe';

@NgModule({
  declarations: [
    NotFoundComponent,
    ShortNamePipe,
    SearchPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({})
  ],
  exports:[
    NotFoundComponent,
    ShortNamePipe,
    SearchPipe,
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class SharedModule { }
