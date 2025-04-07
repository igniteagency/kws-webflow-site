/**
 * Sets up JS redirects for 404 pages for archived pages/slugs
 */
class RedirectHandler {
  private redirects: { [key: string]: string };

  constructor() {
    this.redirects = {
      '/blog/*': '/resources/news-stories',
      '/event/*': '/resources/events',
    };
    this.handleRedirect();
  }

  private handleRedirect() {
    const currentPath = window.location.pathname;

    for (const [key, value] of Object.entries(this.redirects)) {
      const pattern = key.replace('*', '.*');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(currentPath)) {
        window.location.replace(value as string);
        break;
      }
    }
  }
}

new RedirectHandler();
