interface ContractModel {
  id: number;
  contract: boolean;
  price: number;
  advance: number;
  howmuchpaid: number;
  user_id: number;
}

// Date interface
export interface ShowDateModel {
  date: string;
  passed: string;
  expiryDate: string;
  passedEnd: string;
}

// Role interface
export interface RoleModel {
  id: number;
  value: string;
}

// User interface connected with DateModel and RoleModel
export interface UserModel {
  id: number;
  login: string;
  event: string;
  passwordexpirydate: string;
  date: string;
  expirydate: string;
  dir: string;
  permission: number;
  roles: RoleModel[];
  contract: ContractModel[];
}

interface FileModel {
  path: string;
}

// User interface connected with DateModel and RoleModel
export interface UserFrontendModel {
  id: string;
  login: string;
  event: string;
  passwordexpirydate: string;
  date: string;
  dateShow: ShowDateModel;
  expirydate: string;
  dir: string;
  permission: number;
  roles: RoleModel[];
  contract: ContractModel[];
  files: FileModel[]
}

// Token iterface the same like token from server
export interface TokenModel {
  user: {
    userId: string;
    login: string;
    permission: number;
    role: string;
    changePassword: Boolean;
  }
}

// Permission token
export interface PermissionModel {
  id: string;
  name: string;
  value: number;
  deleteValue: number;
  description: string;
  checked: boolean;
}

export type fetchUsersParams = {
  sort: string,
  filter: string,
  page: number,
  perPage: number
}

export interface ScopeBtnModel {
  value: number;
  active: string;
}

export type acriveEnum = 'down' | 'up' | 'no';

export interface SortValueModel {
  id: number;
  value: string;
  active: acriveEnum;
  name: string;
  sortable: boolean;
}

export interface pageRoleModel {
  id: number;
  value: number;
}

export interface pageModel {
  id: number;
  user_id: number;
  url: string;
  name: string;
  description: string;
  dir: string;
  disabled: string;
  site_role_id: number;
  roles: pageRoleModel[];
}

interface fileStatusModel {
  id: number;
  name: string;
}

interface componentFileModel {
  id: number;
  filename: string;
  path: string;
  page_component_id: number;
  file_status_id: number;
  status: fileStatusModel[];
}

export interface componentContentModel {
  id: number;
  name: string;
  description: string;
  content: string;
  order_id: number;
  page_component_id: number;
}

export interface componentModel {
  id: number;
  type: string;
  path: string;
  disabled: boolean;
  files: componentFileModel[];
  content: componentContentModel[];
}

export interface BlockLinkModel {
  id: number;
  icon: string;
  label: string;
  link: string;
  type: 'button' | 'dropdown' | 'hyperlink' | 'onclick';
  onclick: () => void;
}

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

export type componentsType =
  'layout' |  
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
  'subpage-intro' |
  'add-user';

export type ComponentsContextType = {
  pageName: string;
}
