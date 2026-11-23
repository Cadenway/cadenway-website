import { DOCUMENT, inject, Service } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Service PageMetadata
 *
 * @description
 * Maintains the same metadata on initial prerender and on subsequent browser navigation.
 */
@Service()
export class PageMetadata {
  // #region Properties
  /**
   * Property document
   *
   * @description
   * The browser or prerender document whose head carries the canonical link.
   *
   * @type {Document}
   * @readonly
   */
  private readonly document: Document = inject(DOCUMENT);

  /**
   * Property title
   *
   * @description
   * Updates the title in both rendering environments.
   *
   * @type {Title}
   * @readonly
   */
  private readonly title: Title = inject(Title);

  /**
   * Property meta
   *
   * @description
   * Updates the existing descriptive and sharing metadata on navigation.
   *
   * @type {Meta}
   * @readonly
   */
  private readonly meta: Meta = inject(Meta);
  // #endregion

  // #region Methods
  /**
   * Method apply
   *
   * @description
   * Titles and descriptions describe the page currently loaded on the public site.
   *
   * @param {string} title - The French title of the active page.
   * @param {string} description - The French summary of the active page.
   * @param {string} path - The absolute path under the public site's canonical domain.
   */
  public apply(title: string, description: string, path: string): void {
    const canonical: string = new URL(path, 'https://cadenway.com').href;
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });

    const existing: HTMLLinkElement | null =
      this.document.head.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.setAttribute('href', canonical);
      return;
    }
    const link: HTMLLinkElement = this.document.createElement('link');
    link.rel = 'canonical';
    link.setAttribute('href', canonical);
    this.document.head.appendChild(link);
  }
  // #endregion
}
