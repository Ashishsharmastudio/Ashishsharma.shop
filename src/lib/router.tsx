import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState(null, '', to);
      setPath(to);
      window.scrollTo({ top: 0, behavior: 'instant' });
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

/**
 * Custom Link Component that intercepts default click actions
 * to provide smooth client-side SPA routing.
 */
interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  id?: string;
  key?: string;
}

export function Link({ href, children, className = '', activeClassName = '', id }: LinkProps) {
  const { path, navigate } = useRouter();
  
  // Check if link matches active route
  const isActive = path === href || (href !== '/' && path.startsWith(href));
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
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
