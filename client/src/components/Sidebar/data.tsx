import { logoutUserRequest } from '../../actions'

interface SublinkModel {
  id: number;
  label: string;
  link: string;
}

export interface LinkModel {
  id: number;
  icon: string;
  label: string;
  link: string;
  type: 'button' | 'dropdown' | 'hyperlink' | 'onclick';
  position: 'top' | 'middle' | 'bottom';
  subButtons: SublinkModel[];
  onclick: () => void;
}

const nothing = (): void => {}

export const links: LinkModel[] = [
  {
    id: 0,
    label: "Account",
    link: "/admin/edit-user",
    type: "button",
    icon: "icon-user",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 1,
    label: "Dashboard",
    link: "/admin/dashboard",
    type: "button",
    icon: "icon-chart-area-1",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 2,
    label: "Calendar",
    link: "/admin/calendar",
    type: "button",
    icon: "icon-calendar",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 3,
    label: "Pages",
    link: "/admin/webs",
    type: "button",
    icon: "icon-sitemap",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 4,
    label: "Clients",
    link: "/admin/clients",
    type: "button",
    icon: "icon-users",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 5,
    label: "Administrators",
    link: "/admin/admins",
    type: "button",
    icon: "icon-user-md",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 6,
    label: "Blog",
    link: "/admin/home",
    type: "button",
    icon: "icon-popup",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 7,
    label: "Portfolio",
    link: "",
    type: "dropdown",
    icon: "icon-th-2",
    position: "top",
    subButtons: [
      {
        id: 0,
        label: "History wedding",
        link: "/portfolio/history-weddings"
      }, {
        id: 1,
        label: "Photos",
        link: "/portfolio/photos"
      }, {
        id: 2,
        label: "Films",
        link: "/portfolio/films"
      }
    ],
    onclick: () => nothing()
  }, {
    id: 8,
    label: "Log out",
    link: "",
    type: "onclick",
    icon: "icon-power",
    position: "bottom",
    subButtons: [],
    onclick: () => logoutUserRequest()
  }
];
