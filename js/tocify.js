(function ($) {
  Backdrop.behaviors.tocify = {
    attach: function (context, settings) {
      if (typeof tocbot === 'undefined') return;

      const config = (typeof Backdrop !== 'undefined' && Backdrop.settings) || {};
      const selector = config.tocifySelector || '.node-content';
      const offset = parseInt(config.tocifyOffset || 80, 10);
      const includeHtml = !!config.tocifyIncludeHtml;
      const headingSelector = config.tocifyHeadingSelector || 'h1, h2, h3, h4, h5, h6';
      let lastClickedId = null;

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
        includeHtml: includeHtml,
        escapeHtml: !includeHtml,
        disableTocScrollSync: !!config.tocifyDisableTocScrollSync,
        activeLinkClass: config.tocifyActiveLinkClass || 'is-active-link',
        listClass: config.tocifyListClass || 'toc-list',
        linkClass: config.tocifyLinkClass || 'toc-link',
        extraLinkClass: config.tocifyExtraLinkClass || '',
        headingsOffset: parseInt(config.tocifyHeadingsOffset || 0),
        throttleTimeout: parseInt(config.tocifyThrottleTimeout || 50),
        collapsedClass: config.tocifyCollapsedClass || 'is-collapsed',
      });

      // When scroll sync is disabled, forcibly stop tocbot from updating on scroll.
      if (config.tocifyDisableTocScrollSync) {
        // Remove tocbot’s internal scroll listener if present.
        if (tocbot._scrollListener) {
          window.removeEventListener('scroll', tocbot._scrollListener);
          window.removeEventListener('resize', tocbot._scrollListener);
          document.removeEventListener('scroll', tocbot._scrollListener);
          document.removeEventListener('resize', tocbot._scrollListener);
          tocbot._scrollListener = null;
        }

        // No-op updateToc to block any future auto-highlighting calls.
        tocbot.updateToc = function () { return; };
      }

      // Ensure clicks set the active state and remember the last clicked item.
      document.querySelectorAll('#tocify-toc a.toc-link').forEach(link => {
        link.addEventListener('click', () => {
          const href = link.getAttribute('href') || '';
          if (href.startsWith('#')) {
            lastClickedId = href.slice(1);
            document.querySelectorAll('#tocify-toc .' + (config.tocifyActiveLinkClass || 'is-active-link')).forEach(el => el.classList.remove(config.tocifyActiveLinkClass || 'is-active-link'));
            document.querySelectorAll('#tocify-toc .' + 'is-active-li').forEach(el => el.classList.remove('is-active-li'));
            link.classList.add(config.tocifyActiveLinkClass || 'is-active-link');
            const li = link.closest('li');
            if (li) {
              li.classList.add('is-active-li');
            }
          }
        });
      });

      // If scroll sync is disabled, keep the clicked item active while scrolling by reapplying it.
      if (config.tocifyDisableTocScrollSync) {
        const enforceClickedActive = () => {
          if (!lastClickedId) return;
          const target = document.querySelector('#tocify-toc a.toc-link[href="#' + lastClickedId + '"]');
          if (!target) return;
          document.querySelectorAll('#tocify-toc .' + (config.tocifyActiveLinkClass || 'is-active-link')).forEach(el => el.classList.remove(config.tocifyActiveLinkClass || 'is-active-link'));
          document.querySelectorAll('#tocify-toc .' + 'is-active-li').forEach(el => el.classList.remove('is-active-li'));
          target.classList.add(config.tocifyActiveLinkClass || 'is-active-link');
          const li = target.closest('li');
          if (li) {
            li.classList.add('is-active-li');
          }
        };
        window.addEventListener('scroll', enforceClickedActive, { passive: true });
        window.addEventListener('resize', enforceClickedActive);
      }

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
