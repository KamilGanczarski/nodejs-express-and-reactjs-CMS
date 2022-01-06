const links = [
  {
    id: 0,
    label: "Account",
    link: "/admin/user-edit/",
    type: "button",
    icon: "icon-user",
    position: "top",
    subButtons: []
  }, {
    id: 1,
    label: "Dashboard",
    link: "/admin/dashboard",
    type: "button",
    icon: "icon-chart-area-1",
    position: "top",
    subButtons: []
  }, {
    id: 2,
    label: "Calendar",
    link: "/admin/calendar",
    type: "button",
    icon: "icon-calendar",
    position: "top",
    subButtons: []
  }, {
    id: 3,
    label: "Pages",
    link: "/admin/webs",
    type: "button",
    icon: "icon-sitemap",
    position: "top",
    subButtons: []
  }, {
    id: 4,
    label: "Clients",
    link: "/admin/clients",
    type: "button",
    icon: "icon-users",
    position: "top",
    subButtons: []
  }, {
    id: 5,
    label: "Administrators",
    link: "/admin/admins",
    type: "button",
    icon: "icon-user-md",
    position: "top",
    subButtons: []
  }, {
    id: 6,
    label: "Blog",
    link: "/admin/home",
    type: "button",
    icon: "icon-popup",
    position: "top",
    subButtons: []
  }, {
    id: 7,
    label: "Portfolio",
    link: "",
    type: "dropdown",
    icon: "icon-popup",
    position: "top",
    subButtons: [
      {
        id: 0,
        label: "History wedding",
        link: "portfolio/history-weddings"
      }, {
        id: 1,
        label: "Photos",
        link: "portfolio/photos"
      }, {
        id: 2,
        label: "Films",
        link: "portfolio/films"
      }
    ]
  }, {
    id: 8,
    label: "Log out",
    link: "logout",
    type: "button",
    icon: "icon-power",
    position: "bottom",
    subButtons: []
  }
];

export default links;
