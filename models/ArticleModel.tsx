import {BaseModel} from "./BaseModel";

export interface ArticleModel extends BaseModel {
    code: string;
    name: string;
    desc: string;
    content: string;
}