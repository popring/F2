import { isArray } from '_@antv_util@2.0.17@@antv/util';
import Base from './base';
import { Range, Option } from './types';

class Rect extends Base {
  type = 'rect';

  update(option: Option) {
    super.update(option);

    const { left, top, right, bottom } = this;
    const x: Range = [left, right];
    const y: Range = [bottom, top];

    this.x = x;
    this.y = y;
    return this;
  }

  _zoomVal(range, val) {
    return range[0] + (range[1] - range[0]) * val;
  }

  convertPoint(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    const [originX, originY] = [point[xDim], point[yDim]];
    const targetX = isArray(originX)
      ? originX.map((val) => this._zoomVal(x, val))
      : this._zoomVal(x, originX);
    const targetY = isArray(originY)
      ? originY.map((val) => this._zoomVal(y, val))
      : this._zoomVal(y, originY);
    return {
      x: targetX,
      y: targetY,
    };
  }

  invertPoint(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    return {
      [xDim]: (point.x - x[0]) / (x[1] - x[0]),
      [yDim]: (point.y - y[0]) / (y[1] - y[0]),
    };
  }
}

export default Rect;
