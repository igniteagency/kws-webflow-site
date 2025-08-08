const handleExternalLinks = (): void => {
  const externalLinks = document.querySelectorAll<HTMLAnchorElement>('a[data-external="true"]');

  externalLinks.forEach((link) => {
    link.setAttribute('target', '_blank');
  });
};

export default handleExternalLinks;
