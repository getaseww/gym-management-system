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
    href: "/dashboard",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Payments",
    href: "/dashboard/payment",
    icon: <BanknotesIcon className="w-6 h-6" />,
  },
  {
    label: "Instructors",
    href: "/dashboard/instructor",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Memebers",
    href: "/members",
    icon: <UserGroupIcon className="w-6 h-6" />,
  },
  {
    label: "Fitness Classes",
    href: "/dashboard/fitness-class",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Attendance",
    href: "/dashboard/attendance",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    label: "Membership Plans",
    href: "/dashboard/membership-plan",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Equipment Category",
    href: "/dashboard/equipment-category",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Equipment",
    href: "/dashboard/equipment",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: <CalendarIcon className="w-6 h-6" />,
  },
];