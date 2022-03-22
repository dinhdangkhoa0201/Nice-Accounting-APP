import {BaseModel} from "./BaseModel";

export interface CategoryModel extends BaseModel {
    name: string;
    desc: string;
}