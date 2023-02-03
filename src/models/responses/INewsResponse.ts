import IArticle from "@models/IArticle";
import { IPaginationResponse } from "./IPaginationResponse";

interface INewsResponse extends IPaginationResponse {
	articles: IArticle[];
}

export default INewsResponse;
