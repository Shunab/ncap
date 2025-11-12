import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "./Card";

// Timing (ms)
const MERGE_MS = 1000;      // move to center
const MERGED_HOLD_MS = 1000; // how long to stay merged before swapping content
const UNMERGE_MS = 1000;    // move back to positions


export default function RightPanel({ page }) {
  const [currentPage, setCurrentPage] = useState(page);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  // On first load, permanently lock hero-content height using HOME layout
  useEffect(() => {
    const hero = containerRef.current?.closest('.hero-content');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      hero.style.height = `${rect.height}px`;
    }
  }, []);

  // Utility: get natural (static) top positions of each card relative to container
  const measureCardTops = (container, cardNodes) => {
    const cRect = container.getBoundingClientRect();
    return Array.from(cardNodes).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        el,
        top: r.top - cRect.top,
        height: r.height,
        centerOffset: (r.top - cRect.top) + r.height / 2,
      };
    });
  };

  // Compute dy needed to bring a given card center to container center
  const computeDyToCenter = (container, cardCenterOffset) => {
    const cRect = container.getBoundingClientRect();
    const containerCenter = cRect.height / 2; // relative to container top
    return containerCenter - cardCenterOffset; // translateY in px
  };

  useEffect(() => {
    if (isAnimating) return; // prevent re-entry during animation

    // If same page, do NOT mark animating
    if (page === currentPage) return;

    // Now we know an animation WILL run
    setIsAnimating(true);

    // Reset any blog expansion when navigating away or switching pages
    // Removed per instructions

    // If coming from blog with an expanded card, collapse it instantl

    const hero = containerRef.current?.closest('.hero-content');
    let heroPrevHeight = '';
    if (hero) {
      heroPrevHeight = hero.style.height;
      const hRect = hero.getBoundingClientRect();
      hero.style.height = `${hRect.height}px`;
    }

    const container = containerRef.current;
    // Anchor container to prevent vertical drift when hero-content is height-locked
    container.style.position = 'relative';
    container.style.top = '0px';
    if (!container) return;

    // Ensure container has a stable height during animation
    const containerRect = container.getBoundingClientRect();
    const lockedHeight = containerRect.height;
    const prevDisplay = container.style.display;
    const prevHeight = container.style.height;
    container.style.height = `${lockedHeight}px`;

    // Grab existing cards (pre-swap) and measure
    const cards = container.querySelectorAll('.capability');
    if (!cards.length) {
      setCurrentPage(page);
      container.style.height = prevHeight || '';
      if (hero) hero.style.height = heroPrevHeight || '';
      setIsAnimating(false);
      return;
    }

    // Add class to fade text + outline during motion
    container.classList.add('no-borders');

    // Measure natural positions
    const items = measureCardTops(container, cards);

    // Convert all to absolute at their current positions so layout doesn't shift
    items.forEach(({ el, top }) => {
      el.style.position = 'absolute';
      el.style.top = `${top}px`;
      el.style.left = '0';
      el.style.width = '100%';
      el.style.transform = 'translateY(0)';
    });

    document.body.style.pointerEvents = 'none';

    // Trigger MERGE: move each card center to container center
    items.forEach(({ el, centerOffset }) => {
      const dy = computeDyToCenter(container, centerOffset);
      el.style.transition = `transform ${MERGE_MS}ms linear`;
      el.style.transform = `translateY(${dy}px)`;
    });

    // After merge completes, hold merged for a bit, then swap content and set up new cards at center
    const mergeDoneTimer = setTimeout(() => {
      // Swap content while merged
      setCurrentPage(page);

      // Wait one frame for React to render new cards, then prepare them for unmerge
      const afterRender = requestAnimationFrame(() => {
        const newCards = container.querySelectorAll('.capability');
        // Force new cards to start fully invisible to prevent flash
        newCards.forEach((el) => {
          const c = el.querySelector('.content');
          if (c) c.style.opacity = '0';
          el.style.borderColor = 'rgba(var(--color-brown-600-rgb), 0)';
        });
        // Measure their NATURAL target positions first (they are static right now)
        const targets = measureCardTops(container, newCards);

        // Convert new cards to absolute at their natural tops, but start visually at CENTER (merged)
        targets.forEach(({ el, top, centerOffset }) => {
          const dyToCenter = computeDyToCenter(container, centerOffset);
          el.style.position = 'absolute';
          el.style.top = `${top}px`;
          el.style.left = '0';
          el.style.width = '100%';
          // Start from merged state
          el.style.transform = `translateY(${dyToCenter}px)`;
          el.style.transition = 'none';
        });

        // Next frame: UNMERGE new cards to their natural positions
        const unmergeNext = requestAnimationFrame(() => {
          // Begin unmerge motion
          targets.forEach(({ el }) => {
            el.style.transition = `transform ${UNMERGE_MS}ms linear`;
            el.style.transform = 'translateY(0)';
          });

          // Restore borders only AFTER unmerge fully completes
          const fadeBackTimer = setTimeout(() => {
            container.classList.remove('no-borders');
          }, 2000);

          // Cleanup after unmerge finishes
          const cleanupTimer = setTimeout(() => {
            // Remove forced invisible styles so fade-in can occur naturally
            targets.forEach(({ el }) => {
              const c = el.querySelector('.content');
              if (c) c.style.opacity = '';
              el.style.borderColor = '';
            });
            // Clear inline transitions so hover etc. work normally
            targets.forEach(({ el }) => {
              el.style.transition = '';
              el.style.position = '';
              el.style.top = '';
              el.style.left = '';
              el.style.width = '';
              el.style.transform = '';
            });
            // ensure any lingering absolute styles from blog expansion are cleared on page transitions
            const clearAbs = container.querySelectorAll('.capability');
            clearAbs.forEach((el) => {
              el.style.position = '';
              el.style.top = '';
              el.style.left = '';
              el.style.width = '';
              el.style.height = '';
              el.style.transform = '';
              el.style.transition = '';
            });
            container.style.height = prevHeight || '';
            if (hero) hero.style.height = heroPrevHeight || '';
            document.body.style.pointerEvents = '';
            setIsAnimating(false);
          }, UNMERGE_MS + 50);

          // Store timers so they can be cleared if needed
          // (not strictly necessary here, as the effect runs per change)
        });
      });
    }, MERGE_MS + MERGED_HOLD_MS);

    // Safety cleanup on unmount or page change mid-animation
    return () => {
      container.classList.remove('no-borders');
      container.style.height = prevHeight || '';
      if (hero) hero.style.height = heroPrevHeight || '';
      document.body.style.pointerEvents = '';
      setIsAnimating(false);
    };
  }, [page, currentPage]);

  const handleCardClick = useCallback(async (id) => {
    if (currentPage !== 'blog') return;
    if (expandedBlogId === id) return;

    const container = containerRef.current;
    if (!container) return;

    const nodeList = container.querySelectorAll('.capability');
    const cardsArr = Array.from(nodeList);
    const cRect = container.getBoundingClientRect();

    // BEFORE: current absolute/static snapshot
    const before = cardsArr.map((el) => {
      const r = el.getBoundingClientRect();
      return { el, top: r.top - cRect.top, height: r.height };
    });

    // Update state: choose expanded, descriptions collapse on others
    setExpandedBlogId(id);

    // Load markdown in background
    try {
      const res = await fetch(`${process.env.PUBLIC_URL}/blogs/${id}.md`);
      const text = await res.text();
      setBlogContent(text);
    } catch (e) {
      setBlogContent('');
    }

    // AFTER: measure natural heights for collapsed/expanded in new state
    requestAnimationFrame(() => {
      const afterNodes = Array.from(container.querySelectorAll('.capability'));
      const ids = afterNodes.map((el) => el.getAttribute('data-card-id'));
      const expIndex = ids.indexOf(id);
      const aRect = container.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(container).gap || '0') || 0;
      const containerH = aRect.height;

      // Switch all to absolute at BEFORE positions to freeze layout baseline
      before.forEach(({ el, top, height }) => {
        el.style.position = 'absolute';
        el.style.top = `${top}px`;
        el.style.left = '0';
        el.style.width = '100%';
        el.style.height = `${height}px`;
      });

      // Force reflow
      // eslint-disable-next-line no-unused-expressions
      container.offsetHeight;

      // Compute natural target heights: collapse others to their natural title-only height
      const naturalHeights = afterNodes.map((el, i) => {
        // temporarily let the element define its natural height for the new state
        const prevH = el.style.height;
        el.style.height = 'auto';
        const r = el.getBoundingClientRect();
        const h = r.height;
        el.style.height = prevH; // restore inline before animating
        return h;
      });

      // Cap expanded height so the whole stack fits exactly inside the container
      const collapsedHeightsSum = naturalHeights
        .map((h, i) => (i === expIndex ? 0 : h))
        .reduce((a, b) => a + b, 0);
      const totalGaps = gap * (afterNodes.length - 1);
      const expandedHeight = Math.max(120, containerH - collapsedHeightsSum - totalGaps);

      // Build target heights array
      const targetHeights = naturalHeights.map((h, i) => (i === expIndex ? expandedHeight : h));

      // Center the whole block vertically inside the container
      const blockHeight = targetHeights.reduce((a, b) => a + b, 0) + totalGaps;
      const startTop = Math.max(0, (containerH - blockHeight) / 2);

      // Compute target tops sequentially with gap
      const targetTops = [];
      let acc = startTop;
      targetHeights.forEach((h, i) => {
        targetTops[i] = acc;
        acc += h + gap;
      });

      // Animate to targets
      afterNodes.forEach((el, i) => {
        el.style.transition = 'top 400ms var(--ease-standard), height 400ms var(--ease-standard)';
        el.style.top = `${targetTops[i]}px`;
        el.style.height = `${targetHeights[i]}px`;
      });

      // Keep absolute positioning while a card is expanded
    });
  }, [currentPage, expandedBlogId]);

  useEffect(() => {
    if (currentPage !== 'blog') return;
    // If an expanded card exists, ensure container doesn't overflow
    const container = containerRef.current;
    if (!container) return;
    container.style.overflow = 'hidden';
    return () => { container.style.overflow = ''; };
  }, [currentPage, expandedBlogId]);

  const getCards = () => {
    if (currentPage === 'about') {
      return [
        {
          id: 'about-1',
          title: 'Who We Are',
          description:
            'An independent capital and technology firm building systems, data engines, and internal applications for modern markets.',
        },
        {
          id: 'about-2',
          title: 'How We Operate',
          description:
            'Infrastructure led, research driven, and execution focused. We design trading engines and analytical pipelines',
        },
        {
            id: 'about-3',
            title: 'Contact',
            description: (
                <>
                For inquiries or communication, reach us at{" "}
                <a
                    href="mailto:contact@nostops.capital"
                    style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                >
                    contact@nostops.capital
                </a>.
                </>
            ),
            }
      ];
    }

    if (currentPage === 'blog') {
      return [
        {
          id: 'blog-1',
          title: 'Arbitrage Opportunities on Prediction Markets',
          description: (
            <span>
                We tracked odds across MyriadMarkets, Polymarket, and Kalshi every five seconds during NFL markets.{" "}
                <a
                href="https://x.com/nostopscapital/status/1974097509682459060?s=20"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                >
                Tweet Thread
                </a>
            </span>
            ),
        },
        {
          id: 'blog-2',
          title: 'Coming Soon',
          description:
            'Blog content will appear here. Posts about systems, market structure, and product engineering.',
        },
      ];
    }

    return [
      {
        id: 'home-1',
        title: 'Trading Systems',
        description:
          'Automated trading frameworks and multi-strategy execution engines deployed across multiple markets and venues.',
      },
      {
        id: 'home-2',
        title: 'Liquidity & Strategies',
        description:
          'Market-making flows, relative-value models, and capital-driven execution across decentralized ecosystems.',
      },
      {
        id: 'home-3',
        title: 'Data Infrastructure',
        description:
          'Cross-chain and cross-market pipelines for historical, real-time, and research-grade data.',
      },
      {
        id: 'home-4',
        title: 'Product Development',
        description:
          'Internal tools, research applications, and standalone products built and operated by the firm.',
      },
    ];
  };

  const cards = getCards();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} className="capabilities-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            data-card-id={card.id}
            className="capability"
          >
            <div className="content">
              <Card
                title={card.title}
                description={card.description}
                expanded={false}
                fullContent=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}