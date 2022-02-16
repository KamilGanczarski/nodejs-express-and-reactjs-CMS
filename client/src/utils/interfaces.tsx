import { SignatureHelpTriggerReason } from "typescript";

// Date interface
interface DateModel {
  _id: string;
  date: string;
  expiryDate: string;
  contract: boolean;
  pdf: string;
  price: string;
  advance: string;
  howMuchPaid: string;
}

// Date interface
interface DateModifiedModel {
  _id: string;
  date: string;
  dateShow: string;
  passed: string;
  expiryDate: string;
  expiryDateShow: string;
  passedEnd: string;
  contract: boolean;
  pdf: string;
  price: string;
  advance: string;
  howMuchPaid: string;
}

// Role interface
export interface RoleModel {
  _id: string;
  value: string;
}

// User interface connected with DateModel and RoleModel
export interface UserModel {
  _id: string;
  webId: number;
  login: string;
  event: string;
  dir: string;
  date: DateModel;
  permission: number;
  role: RoleModel;
}

interface FileModel {
  path: string;
}

// User interface connected with DateModel and RoleModel
export interface UserFrontendModel {
  _id: string;
  webId: number;
  login: string;
  event: string;
  dir: string;
  date: DateModifiedModel;
  permission: number;
  role: RoleModel;
  files: FileModel[];
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
  _id: string;
  name: string;
  value: number;
  deleteValue: number;
  description: string;
  checked: boolean;
}
