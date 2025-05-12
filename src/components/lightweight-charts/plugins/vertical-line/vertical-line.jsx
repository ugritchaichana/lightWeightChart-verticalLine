import { positionsLine } from './positions.js';

class VertLinePaneRenderer {
  constructor(x, options) {
    this._x = x;
    this._options = options;
  }

  draw(target) {
    target.useBitmapCoordinateSpace(scope => {
      if (this._x === null) return;

      const ctx = scope.context;
      const position = positionsLine(
        this._x,
        scope.horizontalPixelRatio,
        this._options.width
      );

      ctx.fillStyle = this._options.color;
      ctx.fillRect(
        position.position,
        0,
        position.length,
        scope.bitmapSize.height
      );
    });
  }
}

class VertLinePaneView {
  constructor(source, options) {
    this._source = source;
    this._options = options;
  }

  update() {
    const timeScale = this._source._chart.timeScale();
    this._x = timeScale.timeToCoordinate(this._source._time);
  }

  renderer() {
    return new VertLinePaneRenderer(this._x, this._options);
  }
}

class VertLineTimeAxisView {
  constructor(source, options) {
    this._source = source;
    this._options = options;
  }

  update() {
    const timeScale = this._source._chart.timeScale();
    this._x = timeScale.timeToCoordinate(this._source._time);
  }

  visible() {
    return this._options.showLabel;
  }

  tickVisible() {
    return this._options.showLabel;
  }

  coordinate() {
    return this._x ?? 0;
  }

  text() {
    return this._options.labelText;
  }

  textColor() {
    return this._options.labelTextColor;
  }

  backColor() {
    return this._options.labelBackgroundColor;
  }
}

export const defaultOptions = {
  color: 'green',
  labelText: '',
  width: 3,
  labelBackgroundColor: 'green',
  labelTextColor: 'white',
  showLabel: false,
};

export class VertLine {
  constructor(chart, series, time, options = {}) {
    this._chart = chart;
    this._series = series;
    this._time = time;
    this._options = { ...defaultOptions, ...options };
    this._paneViews = [new VertLinePaneView(this, this._options)];
    this._timeAxisViews = [new VertLineTimeAxisView(this, this._options)];
  }

  updateAllViews() {
    this._paneViews.forEach(pw => pw.update());
    this._timeAxisViews.forEach(tw => tw.update());
  }

  timeAxisViews() {
    return this._timeAxisViews;
  }

  paneViews() {
    return this._paneViews;
  }
}