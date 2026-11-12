import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Root component: it only hosts the router outlet; the pages live in `pages/`. */
@Component({
  imports: [RouterOutlet],
  selector: 'cw-root',
  templateUrl: './app.html',
})
export class App {}
