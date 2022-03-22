import {ArticleModel} from "../models/ArticleModel";
import HttpCommon from "./HttpCommon";
import {CriteriaModel} from "../models/CriteriaModel";
import {ResultObject} from "../models/ResultObject";

const findByCriteria = (criteria: CriteriaModel) => {
    return HttpCommon.post("/article/find-by-criteria", {
        criteria: criteria.criteria,
        orderBy: criteria.orderBy,
        page: criteria.page,
        perPage: criteria.perPage
    })
};

function findById(id: number): Promise<ResultObject<ArticleModel>> {
    return HttpCommon.get(`/article/${id}`);
};

function findByCategoryId(id: number): Promise<ResultObject<Array<ArticleModel>>> {
    return HttpCommon.get(`/article/category/${id}`);
}

export const articleAPI = {
    findByCriteria,
    findById,
    findByCategoryId
}