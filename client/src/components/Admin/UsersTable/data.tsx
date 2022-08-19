import { SortValueModel } from '../../../interfaces/interfaces';

export const SortValuesDataUser: SortValueModel[] = [
  {
    id: 0,
    value: "userId",
    active: "down",
    name: "#",
    sortable: true
  }, {
    id: 1,
    value: "login",
    active: "no",
    name: "Login",
    sortable: true
  }, {
    id: 2,
    value: "event",
    active: "no",
    name: "Description",
    sortable: true
  }, {
    id: 3,
    value: "date",
    active: "no",
    name: "Date",
    sortable: true
  }, {
    id: 4,
    value: "expirydate",
    active: "no",
    name: "Expiration date",
    sortable: true
  }
];

export const SortValuesDataCalendar: SortValueModel[] = [
  {
    id: 0,
    value: "userId",
    active: "down",
    name: "#",
    sortable: true
  }, {
    id: 1,
    value: "date",
    active: "no",
    name: "Event date",
    sortable: true
  }, {
    id: 2,
    value: "event",
    active: "no",
    name: "Description",
    sortable: true
  }, {
    id: 3,
    value: "contract",
    active: "no",
    name: "Contract",
    sortable: true
  }, {
    id: 4,
    value: "pdf",
    active: "no",
    name: "File",
    sortable: false
  }, {
    id: 5,
    value: "price",
    active: "no",
    name: "Price",
    sortable: true
  }, {
    id: 6,
    value: "advance",
    active: "no",
    name: "Down payment",
    sortable: true
  }, {
    id: 7,
    value: "howMuchPaid",
    active: "no",
    name: "How much paid",
    sortable: true
  }
];
