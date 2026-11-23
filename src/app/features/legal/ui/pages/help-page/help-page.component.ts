import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageMetadata } from '@core/seo';

/**
 * Component HelpPage
 *
 * @description
 * Makes organization support guidance available without an application session.
 */
@Component({
  selector: 'cw-help-page',
  imports: [RouterLink],
  templateUrl: './help-page.component.html',
})
export class HelpPage {
  // #region Constructor
  /**
   * Constructor
   *
   * @description
   * Sets the help metadata for prerender and browser navigation.
   *
   * @constructor
   */
  public constructor() {
    inject(PageMetadata).apply(
      'Aide — Cadenway',
      'Questions fréquentes sur votre organisation Cadenway.',
      '/aide',
    );
  }
  // #endregion
}
