'use client';

import React, { useState } from 'react';

import Button from '@/components/shared/Button';

interface Permission {
  can: string;
  route?: string;
  parents?: string[];
  value?: string;
}

interface TabItem {
  label: string;
  value: string;
}

interface CustomizePermissionModalProps {
  tabs: TabItem[];
  selected: string[];
  setPermissions: (permissions: string[]) => void;
  permissions: Permission[];
  closeMe: () => void;
}

const CustomizePermissionModal: React.FC<CustomizePermissionModalProps> = ({
  tabs,
  selected,
  setPermissions,
  permissions,
  closeMe,
}) => {
  const [rightTabs, setRightTabs] = useState<TabItem[]>(tabs || []);
  const [searchTabPermission, setSearchTabPermission] = useState('');
  const [searchGroupPermission, setSearchGroupPermission] = useState('');
  const [verticalTab, setVerticalTab] = useState(rightTabs[0]?.value || '');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(selected);

  const filteredPermissions = permissions.filter(
    (ele) => ele?.parents?.includes(verticalTab) || ele?.can === `${verticalTab}.nav`
  );

  const handlePermissions = () => {
    setPermissions(selectedPermissions);
    closeMe();
  };

  const handleSearchGroup = (value: string) => {
    setSearchGroupPermission(value);
    const filteredTabs = tabs.filter((ele) =>
      ele?.value?.toLowerCase().includes(value.toLowerCase())
    );
    setRightTabs(filteredTabs);
    if (filteredTabs.length > 0) {
      setVerticalTab(filteredTabs[0].value);
    }
  };

  const handleSearchTab = (value: string) => {
    setSearchTabPermission(value);
  };

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission));
    } else {
      setSelectedPermissions((prev) => [...prev, permission]);
    }
  };

  const selectAll = (forGroup = false) => {
    const list = forGroup ? filteredPermissions : permissions;
    const all = list.map((p) => p.can);
    setSelectedPermissions(forGroup ? [...new Set([...selectedPermissions, ...all])] : all);
  };

  const deselectAll = (forGroup = false) => {
    const list = forGroup ? filteredPermissions : permissions;
    const all = list.map((p) => p.can);
    setSelectedPermissions((prev) => prev.filter((p) => !all.includes(p)));
  };

  const toggleAll = (isChecked: boolean, forGroup = false) => {
    if (isChecked) {
      selectAll(forGroup);
    } else {
      deselectAll(forGroup);
    }
  };

  const visiblePermissions = filteredPermissions.filter((ele) =>
    ele?.can?.toLowerCase().includes(searchTabPermission.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Section: Search + Global Toggle */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          className="w-full sm:w-1/2 px-3 py-2 border rounded-md text-sm bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] dark:bg-[var(--input)] dark:border-[var(--border)] dark:text-[var(--foreground)] dark:placeholder:text-[var(--muted-foreground)]"
          placeholder="Search Permissions Group"
          value={searchGroupPermission}
          onChange={(e) => handleSearchGroup(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm text-[var(--foreground)] dark:text-[var(--foreground)] select-none">
          <input
            type="checkbox"
            disabled={!rightTabs.length}
            checked={
              permissions.every((p) => selectedPermissions.includes(p.can)) && rightTabs.length > 0
            }
            onChange={(e) => toggleAll(e.target.checked)}
            className="form-checkbox border-[var(--border)] text-[var(--primary)] dark:border-[var(--border)] dark:text-[var(--primary)]"
          />
          Select All Groups Permissions
        </label>
      </div>

      {/* Main Section */}
      <div className="flex gap-6 max-h-[500px] overflow-y-auto">
        {/* Sidebar Tabs */}
        <div className="w-1/4 border-r border-[var(--border)] pr-4 dark:border-[var(--border)]">
          {rightTabs.length ? (
            <ul className="space-y-2">
              {rightTabs.map((item) => (
                <li key={item.value}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition
                      ${
                        verticalTab === item.value
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'hover:bg-[var(--muted)] dark:hover:bg-[var(--muted)] text-[var(--foreground)] dark:text-[var(--foreground)]'
                      }`}
                    onClick={() => setVerticalTab(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)]">
              No Permissions Group Found!
            </p>
          )}
        </div>

        {/* Permissions Panel */}
        <div className="flex-1 space-y-4">
          {/* Tab-level Select All and Search */}
          <div className="flex justify-between items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-[var(--foreground)] dark:text-[var(--foreground)] select-none">
              <input
                type="checkbox"
                disabled={!rightTabs.length}
                checked={
                  filteredPermissions.every((p) => selectedPermissions.includes(p.can)) &&
                  filteredPermissions.length > 0
                }
                onChange={(e) => toggleAll(e.target.checked, true)}
                className="form-checkbox border-[var(--border)] text-[var(--primary)] dark:border-[var(--border)] dark:text-[var(--primary)]"
              />
              Select All
            </label>

            <input
              type="text"
              className="w-1/2 px-3 py-2 border rounded-md text-sm bg-[var(--input)] border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] dark:bg-[var(--input)] dark:border-[var(--border)] dark:text-[var(--foreground)] dark:placeholder:text-[var(--muted-foreground)]"
              placeholder="Search permissions"
              value={searchTabPermission}
              onChange={(e) => handleSearchTab(e.target.value)}
              disabled={!rightTabs.length}
            />
          </div>

          {/* Permissions List */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            {visiblePermissions.length > 0 ? (
              visiblePermissions.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(item.can)}
                    onChange={() => togglePermission(item.can)}
                    className="form-checkbox border-[var(--border)] text-[var(--primary)] dark:border-[var(--border)] dark:text-[var(--primary)]"
                    id={`checkbox-${index}`}
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className="text-sm text-[var(--foreground)] dark:text-[var(--foreground)] select-none"
                  >
                    {item.can}
                  </label>
                </li>
              ))
            ) : (
              <p className="text-sm text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)]">
                No permissions found.
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* Confirm Button */}
      <Button className="w-full" disabled={!selectedPermissions.length} onClick={handlePermissions}>
        Confirm
      </Button>
    </div>
  );
};

export default CustomizePermissionModal;
