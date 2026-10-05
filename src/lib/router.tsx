import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { trackPageView } from './analytics';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname || '/');

  // Initial pageview on mount
  useEffect(() => {
    trackPageView(window.location.pathname, document.title);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      setPath(currentPath);
      window.scrollTo(0, 0);

      // Track back/forward browser navigation
      setTimeout(() => {
        trackPageView(currentPath, document.title);
      }, 50);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState(null, '', to);
      setPath(to);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Track client-side navigation pageview
      setTimeout(() => {
        trackPageView(to, document.title);
      }, 50);
    }
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  id?: string;
  key?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Link({
  href,
  children,
  className = '',
  activeClassName = '',
  id,
  onClick,
}: LinkProps) {
  const { path, navigate } = useRouter();

  const isActive = path === href || (href !== '/' && path.startsWith(href));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    // Only intercept local relative routes
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      id={id}
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`}
    >
      {children}
    </a>
  );
}