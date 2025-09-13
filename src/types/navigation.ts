export type MenuItem = {
  label: string;
  path: string;
  hasDropdown?: boolean;
};

export type DropdownLink = {
  label: string;
  path: string;
};

export type DropdownContent = Record<string, DropdownLink[]>;

// Props for components
export type MobileMenuButtonProps = {
  isOpen: boolean;
  toggle: () => void;
};

export type MobileMenuProps = {
  isOpen: boolean;
  menuItems: MenuItem[];
  dropdownContent: DropdownContent;
  activeItem: string | null;
  openDropdown: string | null;
  toggleDropdown: (item: string) => void;
  handleItemClick: (item: string) => void;
  closeMenu: () => void;
};

export type DesktopDropdownProps = {
  openDropdown: string | null;
  dropdownContent: DropdownContent;
};