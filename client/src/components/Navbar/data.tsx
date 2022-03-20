interface SubButton {
  id: number;
  label: string;
  link: string;
}

export interface LinkType {
  id: number;
  label: string;
  link: string;
  type: 'dropdown' | 'button' | 'hyperlink';
  subButtons: SubButton[];
}

export const links: LinkType[] = [
  {
    id: 0,
    label: 'Home',
    link: '/',
    type: 'button',
    subButtons: []
  }, {
    id: 1,
    label: "Let's meet",
    link: '/lets-meet',
    type: 'button',
    subButtons: []
  }, {
    id: 2,
    label: 'Offers',
    link: '',
    type: 'dropdown',
    subButtons: [
      {
        id: 0,
        label: 'Offer wedding',
        link: '/offer/wedding'
      }, {
        id: 1,
        label: 'Offer photos session',
        link: '/offer/session'
      }, {
        id: 2,
        label: 'Studio rent',
        link: '/offer/studio-rent'
      }, {
        id: 3,
        label: 'Print',
        link: '/offer/print'
      }
    ]
  }, {
    id: 3,
    label: 'Portfolio',
    link: '',
    type: 'dropdown',
    subButtons: [
      {
        id: 0,
        label: 'History wedding',
        link: '/portfolio/history-weddings'
      }, {
        id: 1,
        label: 'Photos',
        link: '/portfolio/photos'
      }, {
        id: 2,
        label: 'Films',
        link: '/portfolio/films'
      }
    ]
  }, {
    id: 4,
    label: 'Studio',
    link: '/studio',
    type: 'button',
    subButtons: []
  }, {
    id: 5,
    label: 'Customer area',
    link: '/login',
    type: 'button',
    subButtons: []
  }, {
    id: 6,
    label: 'FAQ',
    link: '/FAQ',
    type: 'button',
    subButtons: []
  }, {
    id: 7,
    label: 'Contact',
    link: '/contact',
    type: 'button',
    subButtons: []
  }
];

export interface NavbarSettingsType {
  noDynamic: string[];
  noTransparent: string[];
  noDynamicAndNoTransparent: string[];
}

export const settings: NavbarSettingsType = {
  noDynamic: [],
  noTransparent: [],
  noDynamicAndNoTransparent: [
    '/admin/home',
    '/admin/customers',
    '/admin/edit-user',
    '/admin/pages'
  ]
};
