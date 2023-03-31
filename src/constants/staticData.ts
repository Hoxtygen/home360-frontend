import { SelectOption } from "src/typedef";

export interface AdviceProps {
  url: string;
  title: string;
  lesson: string;
  backgroundImage: string;
}
export const buildingType: SelectOption<string>[] = [
  {
    label: "Apartment",
    value: "apartment",
  },
  {
    label: "House",
    value: "house",
  },
  {
    label: "Temporary Living",
    value: "temp-living",
  },
  {
    label: "Shared Room",
    value: "shared-room",
  },
  {
    label: "Office",
    value: "office",
  },
  {
    label: "Hall",
    value: "hall",
  },
  {
    label: "Nursing Home",
    value: "nursing-home",
  },
];
export const buildingPurpose: SelectOption<string>[] = [
  { label: "Rent", value: "rent" },
  { label: "Buy", value: "buy" },
  { label: "Build", value: "build" },
];

export const advice: AdviceProps[] = [
  {
    title: "To Know",
    lesson: "All real estate guides",
    url: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-01x2.jpg",
  },
  {
    title: "Sell",
    lesson: "Real estate sales guide",
    url: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-01x22.jpg",
  },
  {
    title: "Rent",
    lesson: "Rental guide",
    url: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-02x2.jpg",
  },
  {
    title: "To Rent",
    lesson: "Rental guide",
    url: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-03x2.jpg",
  },
  {
    title: "Build",
    lesson: "House building guide",
    url: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-04x2.jpg",
  },
  {
    title: "Buy",
    lesson: "Real estate buying guide",
    url: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-05x2.jpg",
  },
];

export const navList = [
  { href: "/", title: "Search" },
  { href: "/", title: "Sell" },
  { href: "/", title: "Rent" },
  { href: "/", title: "Finance" },
  { href: "/", title: "Move" },
];

export const footerNavList = [
  { id: 1, href: "/", title: "About Us" },
  { id: 2, href: "/", title: "Contact Us" },
  { id: 3, href: "/", title: "Career" },
  { id: 4, href: "/", title: "Sitemap" },
  { id: 5, href: "/", title: "Developer" },
  { id: 6, href: "/", title: "Press Service" },
  { id: 7, href: "/", title: "Subscribe to Newsletter" },
];
