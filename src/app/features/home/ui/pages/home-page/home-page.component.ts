import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMetadata } from '@core/seo';

/**
 * Component HomePage
 *
 * @description
 * Gives anonymous visitors a public entry to the application and the help page.
 */
@Component({
  selector: 'cw-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePage {
  // #region Constructor
  /**
   * Constructor
   *
   * @description
   * Sets the home metadata for prerender and browser navigation.
   *
   * @constructor
   */
  public constructor() {
    inject(PageMetadata).apply(
      'Cadenway — gestion de projet pour les équipes',
      'Vos projets avancent. Votre équipe aussi.',
      '/',
    );
  }
  // #endregion
}
