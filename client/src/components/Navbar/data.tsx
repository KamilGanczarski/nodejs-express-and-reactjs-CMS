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
    label: 'About',
    link: '/about',
    type: 'button',
    subButtons: []
  }, {
    id: 2,
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
    id: 3,
    label: 'Offers',
    link: '/offers',
    type: 'button',
    subButtons: []
  }, {
    id: 4,
    label: 'Customer area',
    link: '/login',
    type: 'button',
    subButtons: []
  }, {
    id: 5,
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
    '/admin',
    '/admin/home',
    '/admin/clients',
    '/admin/edit-user'
  ]
};
