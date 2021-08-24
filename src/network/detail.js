import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
// 将分散的数据集中到一起处理
export class Goods {
  constructor(itemInfo,columns,services) {
      this.title=itemInfo.title
      this.desc=itemInfo.desc
      this.newPrice=itemInfo.lowNowPrice
      this.oldPrice=itemInfo.oldPrice
      this.discount=itemInfo.discouncolumn
      this.columns=columns
      this.services=services
      this.realPrice=itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fan = shopInfo.cfan;
      this.sells = shopInfo.csells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cgoods;
  }
}

export class GoodParam {
  constructor(info,rule) {
      this.image=info.image? info.images[0]:'';
      this.infos=info.set;
      this.sizes=rule.tables;
  }
}
