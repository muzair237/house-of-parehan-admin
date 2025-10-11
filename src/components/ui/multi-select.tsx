'use client';

import * as React from 'react';

import { CheckIcon, ChevronDown, X } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { Option } from '@/lib/utils/types';

import Button from '../shared/Button';

interface MultiSelectProps {
  options: Option[];
  defaultValue?: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  maxVisibleTags?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  defaultValue = [],
  onValueChange,
  placeholder = 'Select options',
  className,
  maxVisibleTags = 3,
}) => {
  const [selected, setSelected] = React.useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleValue = (val: string) => {
    const updated = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];

    setSelected(updated);
    onValueChange(updated);
  };

  const handleRemove = (val: string) => {
    const updated = selected.filter((v) => v !== val);
    setSelected(updated);
    onValueChange(updated);
  };

  const handleClear = () => {
    setSelected([]);
    onValueChange([]);
  };

  const handleSelectAll = () => {
    const allValues = options.map((o) => o.value as string);
    setSelected(allValues);
    onValueChange(allValues);
  };

  const getLabel = (val: string) => options.find((opt) => opt.value === val)?.label || val;

  const visible = selected.slice(0, maxVisibleTags);
  const hiddenCount = selected.length - visible.length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn(
            'w-full min-h-10 justify-start flex-wrap gap-1 text-left px-2', // Ensure tight horizontal padding
            className
          )}
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <>
              {visible.map((val, idx) => (
                <span
                  key={val}
                  className={cn(
                    'flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-foreground border',
                    idx === 0 && 'ml-0'
                  )}
                >
                  {getLabel(val)}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                    className="cursor-pointer hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {hiddenCount > 0 && (
                <span className="text-sm text-muted-foreground">+{hiddenCount} more</span>
              )}
            </>
          )}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[280px] p-0 border bg-popover text-popover-foreground shadow-sm"
        align="start"
        sideOffset={4}
        side="bottom"
        avoidCollisions={false}
        style={{ transition: 'none' }}
      >
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isChecked = selected.includes(option.value as string);
                return (
                  <CommandItem
                    key={option.value as string}
                    onSelect={() => toggleValue(option.value as string)}
                    className="cursor-pointer flex justify-between"
                  >
                    <span>{option.label}</span>
                    {isChecked && <CheckIcon className="h-4 w-4 text-primary" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>

            <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-primary hover:underline cursor-pointer"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-destructive hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
