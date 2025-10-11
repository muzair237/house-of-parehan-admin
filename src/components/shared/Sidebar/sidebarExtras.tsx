'use client';

import React, { useEffect, useState } from 'react';

import authThunk from '@/slices/auth/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import { useTheme } from 'next-themes';

import { useNavigate } from '@/hooks/useNavigate';

import { cn } from '@/lib/utils';

import ModalContainer from '../ModalContainer';
import Tooltip from '../Tooltip';
import { renderIcon } from './renderIcon';
import { SidebarItem } from './types';

interface SidebarExtrasProps {
  items: SidebarItem[];
  collapsed: boolean;
}

const SidebarExtras: React.FC<SidebarExtrasProps> = ({ items, collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.Auth);
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const renderButton = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300',
        'hover:bg-[var(--sidebar-accent)] text-foreground hover:text-primary cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring',
        collapsed ? 'justify-center gap-0' : 'gap-2'
      )}
    >
      <div className={cn('flex items-center', collapsed ? 'justify-center' : 'gap-2')}>
        {collapsed ? (
          <Tooltip label={label} side="right">
            <div>{icon}</div>
          </Tooltip>
        ) : (
          icon
        )}
        {!collapsed && <span className="truncate">{label}</span>}
      </div>
    </div>
  );

  const renderExtras = () =>
    items
      .filter((i) => i.special === 'theme' || i.special === 'logout')
      .map((item) => {
        const isTheme = item.special === 'theme';
        const isLogout = item.special === 'logout';

        const dynamicLabel =
          isTheme && !collapsed
            ? theme === 'dark'
              ? 'Switch to Light'
              : 'Switch to Dark'
            : item.label;

        return (
          <div key={item.label} className={cn(collapsed ? 'px-1' : 'px-3')}>
            {isLogout ? (
              <ModalContainer
                title="Are you sure you want to log out?"
                description="You will be logged out from your current session. You can always log in again later."
                submitButton={{
                  loading: isLoading,
                  variant: 'destructive',
                  label: 'Logout',
                  disabled: !isLoggedIn,
                  onClick: () => dispatch(authThunk.logout({ navigate })),
                }}
              >
                {(open) => renderButton(renderIcon(item.icon), dynamicLabel, open)}
              </ModalContainer>
            ) : (
              renderButton(renderIcon(item.icon), dynamicLabel, toggleTheme)
            )}
          </div>
        );
      });

  return <div className="pb-4 space-y-1">{renderExtras()}</div>;
};

export default SidebarExtras;
