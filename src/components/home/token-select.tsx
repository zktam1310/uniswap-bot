"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const tokens = [
  {
    value: "ETH",
    label: "ETH",
  },
  {
    value: "WETH",
    label: "WETH",
  },
  {
    value: "USDC",
    label: "USDC",
  },
  {
    value: "DAI",
    label: "DAI",
  },
  {
    value: "WBTC",
    label: "WBTC",
  },
]

interface ITokenSelectProp {
  selectedToken: string;
  onTokenChange: (token: string) => void;
}

const TokenSelect: React.FC<ITokenSelectProp> = ({ selectedToken, onTokenChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedToken
            ? tokens.find((token) => token.value === selectedToken)?.label
            : "Select Token..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {tokens.map((token) => (
                <CommandItem
                  key={token.value}
                  value={token.value}
                  onSelect={(currentValue) => {
                    onTokenChange(currentValue === selectedToken ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedToken === token.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {token.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default TokenSelect;