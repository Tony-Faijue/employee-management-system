import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routes.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,         // Required for [(ngModel)]
    ReactiveFormsModule, // Only needed for reactive forms
    AppRoutingModule,    // Ensure AppRoutingModule is correctly imported
    RouterModule         // RouterModule must be included here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}