import { logoutUserRequest } from '../../actions';
import { LinkModel } from '../../utils/interfaces';

const nothing = (): void => {}

export const sidebarLinks: LinkModel[] = [
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
    link: "/admin/pages",
    type: "button",
    icon: "icon-sitemap",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 4,
    label: "Customers",
    link: "/admin/customers",
    type: "button",
    icon: "icon-users",
    position: "top",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 5,
    label: "Administrators",
    link: "/admin/cooperators",
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

type componentsType =
  'hero-carousel' |
  'hero-video' |
  'skewed-slider' |
  'custom-text' |
  'carousel-3-2-1' |
  'carousel-4-3-2-1' |
  'carousel-awards' |
  'gallery' |
  'youtube-films' |
  'youtube-films-counter' |
  'navigation-around-website' |
  'navigation-around-website-1' |
  'chessboard' |
  'collapsing-description' |
  'portfolio-history-wedding' |
  'intro-about-us' |
  'google-map' |
  'footer' |
  'footer-large' |
  'contracts' |
  'subpage-intro';

export const cmsModals = {
  'hero-carousel': false,
  'hero-video': false,
  'skewed-slider': false,
  'custom-text': false,
  'carousel-3-2-1': false,
  'carousel-4-3-2-1': false,
  'carousel-awards': false,
  'gallery': false,
  'youtube-films': false,
  'youtube-films-counter': false,
  'navigation-around-website': false,
  'navigation-around-website-1': false,
  'chessboard': false,
  'collapsing-description': false,
  'portfolio-history-wedding': false,
  'intro-about-us': false,
  'intro-contact': false,
  'google-map': false,
  'footer': false,
  'footer-large': false,
  'contracts': false,
  'subpage-intro': false
};

const showModal =(component: componentsType) => {
  const DOMelement = document.querySelector(`#${component}-modal-btn`) as HTMLButtonElement;
  if (DOMelement) {
    DOMelement.click();
  }
}

export const sidebarCmsLinks: LinkModel[] = [
  ...sidebarLinks,
  {
    id: 9,
    label: "Hero",
    link: "",
    type: "onclick",
    icon: "icon-window",
    position: "middle",
    subButtons: [],
    onclick: () => showModal('hero-carousel')
  }, {
    id: 10,
    label: "Hero video",
    link: "",
    type: "onclick",
    icon: "icon-window",
    position: "middle",
    subButtons: [],
    onclick: () => showModal('hero-video')
  }, {
    id: 11,
    label: "Skewed slider",
    link: "",
    type: "onclick",
    icon: "icon-window",
    position: "middle",
    subButtons: [],
    onclick: () => showModal('skewed-slider')
  }, {
    id: 12,
    label: "Custom text",
    link: "",
    type: "onclick",
    icon: "icon-doc-text-inv",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 13,
    label: "Carousel 3 2 1",
    link: "",
    type: "onclick",
    icon: "icon-video",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 14,
    label: "Carousel 4 3 2 1",
    link: "",
    type: "onclick",
    icon: "icon-video",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 15,
    label: "Carousel awards",
    link: "",
    type: "onclick",
    icon: "icon-video",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 16,
    label: "Gallery",
    link: "",
    type: "onclick",
    icon: "icon-th-2",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 17,
    label: "Youtube films",
    link: "",
    type: "onclick",
    icon: "icon-youtube-1",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 18,
    label: "Youtube films counter",
    link: "",
    type: "onclick",
    icon: "icon-youtube-1",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 19,
    label: "Navigation around website",
    link: "",
    type: "onclick",
    icon: "icon-youtube-1",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 20,
    label: "Chessboard",
    link: "",
    type: "onclick",
    icon: "icon-th-2",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 21,
    label: "Collapsing description",
    link: "",
    type: "onclick",
    icon: "icon-menu-1",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 22,
    label: "Portfolio history wedding",
    link: "",
    type: "onclick",
    icon: "icon-video",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 23,
    label: "Intro about us",
    link: "",
    type: "onclick",
    icon: "icon-popup",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 24,
    label: "Intro contact",
    link: "",
    type: "onclick",
    icon: "icon-popup",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 25,
    label: "Google map",
    link: "",
    type: "onclick",
    icon: "icon-location",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 26,
    label: "Footer",
    link: "",
    type: "onclick",
    icon: "icon-window",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }, {
    id: 27,
    label: "Footer large",
    link: "",
    type: "onclick",
    icon: "icon-window",
    position: "middle",
    subButtons: [],
    onclick: () => nothing()
  }
]
