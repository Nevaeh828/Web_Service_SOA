import SearchPage from "../pages/search/searchPage";
import SearchResult from "../pages/search/searchResult";


export const mainRoutes = [{
    path: "/search",
    title: "搜索页面",
    component: SearchPage
},
{
    path: "/searchResult/:kw",
    title: "搜索结果页面",
    component: SearchResult
}]