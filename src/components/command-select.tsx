import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface Props {
  options: Array<{ id: string; value: string; children: ReactNode }>;
  onSelect: (value: string) => void;
  searchValue?: string;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  searchValue,
  onSearch, // tells the command select to not use the built in filter, we'll be using network filtering by passing this onSearch prop
  value,
  placeholder = "Select an option",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  // I can also use this function to close the modal of the command select, which resets the CommandInput state to an empty string
  // const handleOpenChange = (open: boolean) => {
  //   setOpen(open);
  //   onSearch?.("");
  // };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch} // custom prop: 8:18:00: if we have onSearch its going to be "false" if we dont it would be "true"
        open={open}
        // onOpenChange={handleOpenChange}
        onOpenChange={setOpen}
      >
        <CommandInput
          placeholder="Search..."
          value={searchValue} // remove when using handleOpenChange()
          onValueChange={onSearch}
        />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
                // handleOpenChange(false)
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
