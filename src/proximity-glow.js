/**
 * jquery-proximity-glow - jQuery plugin that allows elements to glow more or 
 * less based on mouse proximity.
 * URL: http://pstrinkle.github.com/jquery-proximity-glow
 * Author: Patrick Trinkle <https://github.com/pstrinkle>
 * Version: 1.0.0
 * Copyright 2016 Patrick Trinkle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function ($) {
    function ProximityGlow(config) {
        this.init(config);
    }

    ProximityGlow.prototype = {

        /**
         * maxBlurSize
         * 
         * Used as the largest possible blur size.
         */
        maxBlurSize: 180,

        /**
         * color
         * 
         * The color to use.  Yes you can actually have glows with multiple
         * colors, but this plugin doesn't presently support that.
         */
        color: '#fff',

        /**
         * inverse
         * 
         * If true, it grows larger as you get closer, false is the opposite.
         */
        inverse: true,
        
        /**
         * XXX: in case we end up allow text-shadow alternate.
         */
        shadowType: 'box-shadow',

        //----------------------- protected properties and methods -------------
        /**
         * @protected
         */
        constructor: ProximityGlow,

        /**
         * Container element. Should be passed into constructor config
         * @protected
         * @type {jQuery}
         */
        el: null,

        /**
         * Init/re-init the object
         * @param {object} config - Config
         */
        init: function(config) {
            $.extend(this, config);
        },

        dataName: 'proximity-glow',
        maxD : 0,
        middleX: 0,
        middleY: 0,
        
        handleMove: function(event) {
            var dis = pythag(event.pageX, event.pageY, this.middleX, this.middleY);
            
            /* XXX: this will depend on whether it's the inverse distance or 
             * not.
             */
            if (this.inverse) {
                var xyper = 1 - (dis / this.maxD);
            } else {
                var xyper = (dis / this.maxD);
            }

            var glow = xyper * this.maxBlurSize;
            glow = Math.round(glow);

            var spread = glow / 2;
            var $gb = this.el;
            if (this.shadowType === 'box-shadow') {
            	$gb.css(this.shadowType, '0 0 ' + glow + 'px' + ' ' + spread + 'px ' + this.color);
            } else if (this.shadowType === 'text-shadow') {
            	$gb.css(this.shadowType, '0px 0px ' + glow + 'px' + ' ' + this.color);
            }
        },
    }

    var pythag = function(x1, y1, x2, y2) {
        var x = x2 - x1;
        var y = y2 - y1;
        var a = (x * x) + (y * y);
        return Math.sqrt(a);
    };

    //----------------------- Initiating jQuery plugin -------------------------

    /**
     * Set up an element that glows via proximity.
     * 
     * @param configOrCommand - Config object or command name
     *     Example: { ... };
     *     you may set any public property (see above);
     *     
     */
    $.fn.proximityGlow = function(configOrCommand) {
        /* It is possible that the text will be updated out of sequence
         * because of the timeouts, that you might not end up with the
         * right value, so the right value is basically always in data.
         */
        var dataName = ProximityGlow.prototype.dataName;

        /* handle init here, I later plan to use other options, such as formatting. */
        return this.each(function() {
            var el = $(this), instance = el.data(dataName),
                config = $.isPlainObject(configOrCommand) ? configOrCommand : {};

            var initialConfig = $.extend({}, el.data());
            config = $.extend(initialConfig, config);
            config.el = el;

            instance = new ProximityGlow(config);

            var $gb = el;
            var position = $gb.offset();
            var realWidth = $gb.outerWidth();
            var realHeight = $gb.outerHeight();
            instance.middleX = position.left + (realWidth/2);
            instance.middleY = position.top + (realHeight/2);

            var $d = $(document);
            var dw = $d.width();
            var dh = $d.height();

            /* try to determine maximum possible distance from button;
             * forget maximum length of the given vector --- which we could compute
             * ... maybe later.
             *
             * to compute maximum relative distance you only need to computer the
             * intercept point along the bounding box, by plugging the slope into
             * f(x) = y, and determining from whether you're above, below, left,
             * or right of the button the interception point in the box to use
             * for the distance.
             */
            instance.maxD = pythag(instance.middleX, instance.middleY, dw, dh);

            $(document).mousemove(function(event) {
                instance.handleMove(event);
            });

            el.data(dataName, instance);
        });
    };
}(jQuery));
