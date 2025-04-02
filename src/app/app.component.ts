import { Component } from '@angular/core'; // Angular core module for component definition
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router'; // Angular router for navigation
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root', // The root selector for the component
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html', // Path to the HTML template
  styleUrls: ['./app.component.css'] // Path to the CSS styles
})
export class AppComponent {
  title = 'Employee Management Application'; // Dynamic title property
}