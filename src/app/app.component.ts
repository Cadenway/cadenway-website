import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Component App
 *
 * @description
 * Root component hosting the router outlet; pages belong to their features.
 */
@Component({
  imports: [RouterOutlet],
  selector: 'cw-root',
  templateUrl: './app.component.html',
})
export class App {}
