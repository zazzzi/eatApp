import {MenuItem} from "../context/CartContext";
export interface MenuItemType {
  id: string,
  title: string,
  price: number,
  quantity: number,
  content: string[],
  category: string[],
  img: string
}
export interface IncomingUser {
  email: string,
  password: string
}
export interface User {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  role: string,
  password: string, 
  ID?: string,
  backgroundImg?: string,
  themeColor?: string, 
}
export interface Order {
  id?: string,
  orderDate: Date,
  cart: MenuItem[],
  session: string,
  priceTotal: number,
  table: string,
  payment: any
}