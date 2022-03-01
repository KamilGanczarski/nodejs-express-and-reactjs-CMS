import { SignatureHelpTriggerReason } from "typescript";

interface ContractModel {
  pdf: string;
  price: number;
  advance: number;
  user_id: number;
  contract: boolean;
  howmuchpaid: number;
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
