import {County} from "./county";
import {ResourceCategory} from "./resource_category";

export class Resource {
  id: number
  name: string
  categoryId?: number //needed when creating resources
  countyId?: number //needed when creating resources
  street: string
  city: string
  state: string
  zip: string
  latitude: number
  longitude: number
  description: string
  website: string
  phone?:string
  email?:string
  county: County
  category: ResourceCategory
}
