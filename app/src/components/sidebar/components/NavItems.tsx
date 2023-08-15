// components/defaultNavItems.tsx
import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  BanknotesIcon,

} from "@heroicons/react/24/outline";
// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Payments",
    href: "/payments",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  {
    label: "Instructors",
    href: "/instructor",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Memebers",
    href: "/members",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Classes",
    href: "/classes",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Membership Plans",
    href: "/membership_plan",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Equipment Category",
    href: "/equipment_category",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Equipment",
    href: "/equipment",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];