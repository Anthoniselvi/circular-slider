// ####### ------------------------------------------------------------ #######
// customization to create the ranges on top of the slider path //
// this will be draw based on the 'ranges' property
// ####### ------------------------------------------------------------ #######
var fn1 = $.fn.roundSlider.prototype._setProperties;
$.fn.roundSlider.prototype._setProperties = function () {
  fn1.apply(this);
  var o = this.options,
    r = o.radius,
    r1 = r - o.width / 2 - o.borderWidth;
  var svgElement = this.svgContainer.children();

  for (var i = 0; i < o.ranges.length; i++) {
    var obj = o.ranges[i];
    var startPoint = this._valueToAngle(obj.start),
      endPoint = this._valueToAngle(obj.end);

    var path = this.$createSVG("path");
    var d = this.$drawPath(r, r1, startPoint, endPoint);
    var attr = {
      d: d,
      "stroke-width": o.width,
      stroke: obj.bgcolor,
      fill: "transparent",
    };
    this.$setAttribute(path, attr);
    svgElement.append(path);
  }
};
// ####### ------------------------------------------------------------ #######

$("#slider").roundSlider({
  sliderType: "default",
  radius: 120,
  width: 18,
  handleSize: "+6",

  startAngle: "105",
  endAngle: "75",
  editableTooltip: false,

  svgMode: true,
  borderWidth: 0,

  // sample level customized property
  ranges: [
    { start: 0, end: 30, bgcolor: "#E9573F" },
    { start: 31, end: 50, bgcolor: "#009688" },
    { start: 51, end: 100, bgcolor: "#3f51b5" },
  ],

  create: function () {
    this._createHandle(2).addClass("green");
    this._createHandle(3).addClass("blue");
  },

  beforeValueChange: function (e) {
    // in the 'beforeValueChange' event we can decide the handle behaviour
    // based on that we can restrict the handle at any range
    var handle = this._active,
      val = e.value;

    if (handle === 1) {
      if (val > 75) {
        obj.setValue(0, 1);
        return false;
      }
      if (val > 30) {
        obj.setValue(30, 1);
        return false;
      }
    }

    if (handle === 2) {
      if (val < 31) {
        obj.setValue(31, 2);
        return false;
      }
      if (val > 50) {
        obj.setValue(50, 2);
        return false;
      }
    }

    if (handle === 3 && val < 51) {
      if (val < 25) {
        obj.setValue(100, 3);
        return false;
      }
      if (val < 51) {
        obj.setValue(51, 3);
        return false;
      }
    }
  },
});

var obj = $("#slider").data("roundSlider");

$("#slider").roundSlider({
  tooltipFormat: function () {
    // here any custom tooltip format can be used
    return (
      this._handle1.value +
      " - " +
      this._handle2.value +
      " - " +
      this._handle3.value
    );
  },
});

// initialize the handles with their values
obj.setValue(10, 1);
obj.setValue(40, 2);
obj.setValue(80, 3);
