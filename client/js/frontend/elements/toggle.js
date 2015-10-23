/*
* Open and close elements
*/

;(function ($, window, document, undefined) {
  var pluginName = "openclose";

  // Private methods
  var initializeElement = function (element, options) {
    // Event handlers
    var trigger = element;
    var target = $(element.attr("data-toggle-target"));
    var eventType = element.attr("data-toggle-event");
    if(eventType == undefined) {
      eventType = "click";
    }
    var placement = element.attr("data-toggle-placement");
    if(placement == undefined) {
      placement = "bottom";
    }

    $("body").append(target);

    var data = {trigger: trigger, target: target, placement: placement};
    if(eventType == "hover") {
      trigger.on("mouseover", data, toggle);
      trigger.on("mouseout", data, toggle);
      target.on("mouseover", data, toggle);
      target.on("mouseout", data, toggle);
    } else {
      trigger.on(eventType, data, toggle);
      // Do not have click close on hover
      $("body").on("click", function(e) {
        var eventTarget = $(e.target);
        if(eventTarget.closest(trigger.selector).length == 0 && !target.hasClass('toggle-inclosable')) {
          var eventData = {data: {target: target}};
          close(eventData);
        }
      });
    }
    $(window).on("resize", data, close);
  };

  /*
  * Toggle event
  */
  var toggle = function(e) {
    var target = e.data.target;
    if(target.hasClass('toggle-active')) {
      close(e);
    } else {
      open(e);
    }
  };

  var open = function(e) {
    var trigger = e.data.trigger;
    var target = e.data.target;
    var placement = e.data.placement;
    placeElement(trigger, target, placement);
    target.addClass('toggle-active');
    target.addClass("toggle-inclosable");
    setTimeout(function() {
      target.removeClass('toggle-inclosable');
    }, 100);
  };
  var close = function(e) {
    var target = e.data.target;
    target.offset({top: -9999, left: -9999});
    target.removeClass('toggle-active');
  };



  var placeElement = function(trigger, target, placement) {
    var height = trigger.outerHeight();
    var width = trigger.outerWidth();

    var targetHeight = target.outerHeight();
    var targetWidth = target.outerWidth();

    var pos = trigger.offset();

    switch (placement) {
      case "custom":
      case "none":
      case "css":
      break;
      case "bottom":
      pos['top'] = pos['top'] + height;
      pos['left'] = pos['left'] + width/2 - targetWidth/2;
      target.addClass('toggle-bottom');
      break;
      case "left":
      pos['top'] = pos['top'] - targetHeight/2 + height/2;
      pos['left'] = pos['left'] - targetWidth;
      target.addClass('toggle-left');
      break;
      case "right":
      pos['top'] = pos['top'] - targetHeight/2 + height/2;
      pos['left'] = pos['left'] + width;
      target.addClass('toggle-right');
      break;
      case "top":
      default:
      pos['top'] = pos['top'] - targetHeight;
      pos['left'] = pos['left'] + width/2 - targetWidth/2;
      target.addClass('toggle-top');
      break;
    }
    target.offset(pos);
  };

  var Plugin = function (element, options) {
    this.element = element;
    this.options = {};
    this.init(options);
  };

  Plugin.prototype = {
    init: function (options) {
      $.extend(this.options, options);
      // Initialize
      initializeElement($(this.element), this.options);
    },
    // Public methods
    public: function () {}
  };
  // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, 
            new Plugin( this, options ));
        }
      });
    }
  }(jQuery, window, document));

$("[data-toggle-target]").openclose();