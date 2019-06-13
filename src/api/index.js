import ajax from './ajax'
//const BASE_URL = 'http://localhost:4000'
//const BASE_URL = '/api'
// 1.根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`/api/position/${geohash}`)
//2. 获取食物分类列表
export const reqFoodType = () => ajax('/api/index_category')
//3. 获取商家列表
export const reqShops = (longitude,latitude) => ajax('/api/shops', {longitude, latitude})
//4. 根据经纬度和关键字搜索商铺列表




