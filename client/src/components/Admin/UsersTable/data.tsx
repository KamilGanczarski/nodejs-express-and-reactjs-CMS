export type acriveEnum = 'down' | 'up' | 'no';

export interface SortValueModel {
  id: number;
  value: string;
  active: acriveEnum;
  name: string;
}

export const SortValuesData: SortValueModel[] = [
  {
    id: 0,
    value: "webId",
    active: "down",
    name: "#"
  }, {
    id: 1,
    value: "login",
    active: "no",
    name: "Login"
  }, {
    id: 2,
    value: "event",
    active: "no",
    name: "Description"
  }, {
    id: 3,
    value: "date",
    active: "no",
    name: "Date"
  }, {
    id: 4,
    value: "expiry_date",
    active: "no",
    name: "Expiration date"
  }
];

export interface tableRowsLimitBtnModel {
  value: number;
  active: string;
}

export let tableRowsLimitBtn: tableRowsLimitBtnModel[] = [
  {
    value: 2,
    active: ''
  }, {
    value: 5,
    active: 'active'
  }, {
    value: 10,
    active: ''
  }, {
    value: 20,
    active: ''
  }, {
    value: 30,
    active: ''
  }, {
    value: 40,
    active: ''
  }, {
    value: 50,
    active: ''
  }, {
    value: 60,
    active: ''
  }
];

export interface ScopeBtnModel {
  value: number;
  active: string;
}
