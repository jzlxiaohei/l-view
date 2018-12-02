import { observable, action } from 'mobx';
import BaseModel from  '../BaseModel';
import _ from 'lodash';

const cache = {};

function getImageMeta(src) {
  if (cache[src]) {
    return Promise.resolve(cache[src]);
  }

  return new Promise(function (resolve, reject){
    const image = new Image();
    image.onerror = reject;
    image.onload = () => {
      const meta = {
        width: image.width,
        height: image.height,
      };
      cache[src] = meta;
      resolve(meta);
    }
    image.src = src;
  })
}

class Image extends BaseModel{

  constructor(_getImageMeta) {
    super();
    this.getImageMeta = _getImageMeta || getImageMeta;
    this.init();
  }

  init() {
    this.assignAttr({
      src: 'https://cdn.llscdn.com/fe-static/lls-acts/tx-B5Oc6SnV.jpg',
    })
  }

  // 以宽度为依据，调整尺寸，避免压缩
  @action
  async getAutoHeight(targetWidth) {
    const { width, height } = await this.getImageMeta();
    const targetHeight =  height * targetWidth / width;
    return targetHeight;
  }

}

export default Image;
