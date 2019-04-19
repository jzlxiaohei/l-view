import { action } from 'mobx';
import BaseModel from  '../BaseModel';


const cache = {};

function getImageMeta(src) {
  if (cache[src]) {
    return Promise.resolve(cache[src]);
  }

  return new Promise(function (resolve, reject){
    const img = new Image();
    img.onerror = reject;
    img.onload = () => {
      const meta = {
        width: img.width,
        height: img.height,
      };
      cache[src] = meta;
      resolve(meta);
    }
    img.src = src;
  })
}

class ImageModel extends BaseModel{

  constructor() {
    super();
    // this.getImageMeta = _getImageMeta || getImageMeta;
    this.init();
  }

  init() {
    this.assignAttr({
      src: 'https://cdn.llscdn.com/fe-static/lls-acts/tx-B5Oc6SnV.jpg',
    })
  }

  // 以宽度为依据，调整尺寸，避免压缩
  @action
  async autoHeight() {
    const targetWidth = this.style.width;
    if(!targetWidth) {
      return;
    }
    try {
      const { width, height } = await getImageMeta(this.attr.src);
      const targetHeight =  height * targetWidth / width;
      this.assignStyle({
        height: targetHeight,
      })
    } catch(e) {
      console.error(e);
    }

  }

}

export default ImageModel;
