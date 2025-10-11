'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '@/slices/hooks';
import { ChevronDown, ChevronRight, PanelLeftClose, PanelRightOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import Tooltip from '../Tooltip';
import { renderIcon } from './renderIcon';
import SidebarExtras from './sidebarExtras';
import { SidebarItem } from './types';

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

const COLLAPSE_BREAKPOINT = 768;

const Sidebar: React.FC<SidebarProps> = ({ items, className }) => {
  const { allowedPages } = useAppSelector((state) => state.Auth);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < COLLAPSE_BREAKPOINT;
      setIsMobile(isMobileView);
      setCollapsed(isMobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedCollapsed = sessionStorage.getItem('sidebar-collapsed');
    const handleResize = () => {
      const isMobileView = window.innerWidth < COLLAPSE_BREAKPOINT;
      setIsMobile(isMobileView);

      if (isMobileView) {
        setCollapsed(true);
      } else if (savedCollapsed !== null) {
        setCollapsed(savedCollapsed === 'true');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = useCallback((href?: string) => !!href && pathname.startsWith(href), [pathname]);

  const handleParentClick = useCallback(
    (item: SidebarItem) => {
      if (!item.children?.length) return;

      if (collapsed) {
        setCollapsed(false);
        setOpenMenus({ [item.label]: true });
      } else {
        setOpenMenus((prev) => ({
          ...prev,
          [item.label]: !prev[item.label],
        }));
      }
    },
    [collapsed]
  );

  const filterSidebarItems = (items: SidebarItem[], allowedPages: string[]): SidebarItem[] => {
    return items
      .map((item) => {
        if (item.children) {
          const allowedChildren = item.children.filter((child) =>
            allowedPages.includes(child.href!)
          );
          if (allowedChildren.length > 0) {
            return { ...item, children: allowedChildren };
          }
          return null;
        }
        return item.href && allowedPages.includes(item.href) ? item : null;
      })
      .filter(Boolean) as SidebarItem[];
  };

  const filteredItems = useMemo(
    () => filterSidebarItems(items, allowedPages),
    [items, allowedPages]
  );

  return (
    <>
      <aside
        className={cn(
          collapsed ? 'w-16' : isMobile ? 'w-[280px] fixed inset-y-0 left-0 z-50' : 'w-[280px]',
          'max-w-full h-full flex-shrink-0 border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]',
          isMobile && !collapsed ? 'shadow-lg' : '',
          'transition-all duration-300 ease-in-out overflow-hidden',
          className
        )}
      >
        <div className="absolute top-2 left-3 z-10">
          <button
            onClick={() => {
              const newCollapsed = !collapsed;
              setCollapsed(newCollapsed);
              sessionStorage.setItem('sidebar-collapsed', String(newCollapsed));
            }}
            className="rounded-md p-1 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {collapsed ? <PanelRightOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        <div className="h-full flex flex-col justify-between pt-10 pb-4">
          <nav className={cn('space-y-1', collapsed ? 'px-1' : 'px-3')}>
            {filteredItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const childActive = item.children?.some((child) => isActive(child.href));
              const isOpen = openMenus[item.label] ?? isActive(item.href);
              const active = isActive(item.href) || childActive; // ✅ parent highlights if any child is active

              const ItemContent = (
                <div
                  role={hasChildren ? 'button' : undefined}
                  tabIndex={hasChildren ? 0 : -1}
                  className={cn(
                    'flex items-center gap-2 justify-start px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    'hover:bg-[var(--sidebar-accent)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    active && 'bg-[var(--sidebar-accent)] text-[var(--sidebar-primary)]'
                  )}
                  aria-expanded={hasChildren ? isOpen : undefined}
                >
                  <div
                    className={cn(
                      'flex items-center justify-center transition-all duration-300',
                      collapsed ? 'w-full' : ''
                    )}
                  >
                    {collapsed ? (
                      <Tooltip label={item.label} side="right">
                        <div
                          className={cn(
                            'rounded-md transition-all duration-300', // ✅ removed p-2
                            active && 'bg-[var(--sidebar-accent)] text-[var(--sidebar-primary)]'
                          )}
                        >
                          {renderIcon(item.icon)}
                        </div>
                      </Tooltip>
                    ) : (
                      renderIcon(item.icon)
                    )}
                  </div>

                  <div
                    className={cn(
                      'flex items-center gap-2 overflow-hidden transition-all duration-300 origin-left',
                      collapsed
                        ? 'opacity-0 scale-x-0 w-0 pointer-events-none'
                        : 'opacity-100 scale-x-100 w-auto'
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                    {hasChildren &&
                      (isOpen ? (
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      ) : (
                        <ChevronRight className="w-4 h-4 opacity-70" />
                      ))}
                  </div>
                </div>
              );

              return (
                <div key={item.label} className="group relative">
                  {hasChildren ? (
                    <div onClick={() => handleParentClick(item)} className="cursor-pointer">
                      {ItemContent}
                    </div>
                  ) : (
                    <Link href={item.href!}>
                      <span>{ItemContent}</span>
                    </Link>
                  )}

                  {!collapsed && hasChildren && (
                    <div
                      className={cn(
                        'ml-5 transition-all duration-300 origin-top overflow-hidden',
                        isOpen
                          ? 'scale-y-100 opacity-100 max-h-[999px] py-1'
                          : 'scale-y-0 opacity-0 max-h-0 py-0'
                      )}
                    >
                      <div className="space-y-1">
                        {item.children?.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link key={child.label} href={child.href!}>
                              <span
                                className={cn(
                                  'flex items-center gap-2 px-2.5 py-2 text-sm rounded-md transition-colors',
                                  'hover:bg-[var(--sidebar-accent)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                  childActive &&
                                    'bg-[var(--sidebar-accent)] text-[var(--sidebar-primary)]'
                                )}
                              >
                                {renderIcon(child.icon)}
                                <span>{child.label}</span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <SidebarExtras items={items} collapsed={collapsed} />
        </div>
      </aside>

      {isMobile && !collapsed && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setCollapsed(true)} />
      )}
    </>
  );
};

export default Sidebar;
