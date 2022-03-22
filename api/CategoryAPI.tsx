import HttpCommon from "./HttpCommon";
import {ResultObject} from "../models/ResultObject";
import {CategoryModel} from "../models/CategoryModel";

function findById(id: number): Promise<ResultObject<CategoryModel>> {
    return HttpCommon.get(`/category/${id}`);
}

function findAll(): Promise<ResultObject<Array<CategoryModel>>> {
    return HttpCommon.get("/category/findAll")
}

export const categoryAPI = {
    findById,
    findAll
}