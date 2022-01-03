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