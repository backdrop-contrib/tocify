(function ($) {
  Backdrop.behaviors.tocify = {
    attach: function (context, settings) {
      if (typeof tocbot === 'undefined') return;

      const config = (typeof Backdrop !== 'undefined' && Backdrop.settings) || {};
      const selector = config.tocifySelector || '.node-content';
      const offset = parseInt(config.tocifyOffset || 80, 10);
      const headingSelector = config.tocifyHeadingSelector || 'h1, h2, h3, h4, h5, h6';

      const contentArea = document.querySelector(selector);
      if (!contentArea) return;

      function generateSlug(text) {
        return text.trim().toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      const headings = contentArea.querySelectorAll(headingSelector);
      headings.forEach((heading) => {
        if (!heading.dataset.tocifyProcessed) {
          const slug = generateSlug(config.tocifyIncludeHtml ? heading.innerHTML : heading.textContent || '');
          heading.id = slug;
          heading.dataset.tocifyProcessed = 'true';
          if (!config.tocifyIncludeHtml && heading.innerHTML !== heading.textContent) {
            heading.innerHTML = heading.textContent || heading.innerHTML.replace(/<[^>]+>/g, '');
          }
        }
      });

      if (document.querySelector('.toc-list')) {
        tocbot.destroy();
      }

      tocbot.init({
        tocSelector: '#tocify-toc',
        contentSelector: selector,
        headingSelector: config.tocifyHeadingSelector || 'h1, h2, h3, h4, h5, h6',
        collapseDepth: config.tocifyEnableCollapse ? parseInt(config.tocifyCollapseDepth || 6) : 0,
        scrollSmooth: !!config.tocifySmoothScroll,
        scrollSmoothOffset: offset,
        orderedList: !!config.tocifyOrderedList,
        positionFixedSelector: config.tocifyPositionFixedSelector || '#tocify-toc',
        positionFixedClass: config.tocifyPositionFixedClass || 'is-fixed',
        fixedSidebarOffset: config.tocifyFixedSidebarOffset || 'auto',
        includeHtml: !!config.tocifyIncludeHtml,
        escapeHtml: !config.tocifyIncludeHtml,
        disableTocScrollSync: !!config.tocifyDisableTocScrollSync,
        activeLinkClass: config.tocifyActiveLinkClass || 'is-active-link',
        listClass: config.tocifyListClass || 'toc-list',
        linkClass: config.tocifyLinkClass || 'toc-link',
        extraLinkClass: config.tocifyExtraLinkClass || '',
        headingsOffset: parseInt(config.tocifyHeadingsOffset || 0),
        throttleTimeout: parseInt(config.tocifyThrottleTimeout || 50),
        collapsedClass: config.tocifyCollapsedClass || 'is-collapsed',
      });

      // Preserve original list-style-type for collapsed TOC items
      document.querySelectorAll('.' + (config.tocifyCollapsedClass || 'is-collapsed')).forEach(item => {
        const nestedList = item.querySelector('ol, ul');
        if (nestedList) {
          nestedList.style.removeProperty('list-style-type');
        }
      });

    }
  };
})(jQuery);
