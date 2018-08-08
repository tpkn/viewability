/*!
 * Viewability, http://tpkn.me/
 */

function Viewability(stage, element, options){
   if(typeof stage !== 'object') throw new Error('no stage object');
   if(typeof element !== 'object') throw new Error('no element object');

   var iab = typeof options.iab === 'undefined' ? false : options.iab;
   var callback = typeof options.on_visible !== 'function' ? null : options.on_visible;
   var percentage = typeof options.percentage !== 'number' && iab ? 50 : options.percentage;

   var tid;
   var stage_width, stage_height;
   var element_width, element_height;
   var sx_min, sy_min, sx_max, sy_max;
   var ex_min, ey_min, ex_max, ey_max;
   var vx, vy, sq;

   /**
    * Calculate div's visibility based on a few params...
    * @return {Object}
    */
   function getAxisVA(stage_min, stage_max, element_min, element_max, stage_size, element_size){
      var n;

      if(element_min >= stage_min && element_max <= stage_max){
         n = element_size;
      }else if(element_min <= stage_min && element_max >= stage_max){
         n = stage_size;
      }else if(element_min <= stage_min && stage_min <= element_max){
         n = element_max - stage_min;
      }else if(element_max >= stage_max && element_min <= stage_max){
         n = stage_max - element_min;
      }else{
         n = 0;
      }

      return { num: n, per: n / element_size * 100 };
   }

   /**
    * @return {Number}
    */
   function getSquareVA(vx, vy, ew, eh){
      return (vx * vy) / (ew * eh) * 100;
   }

   /**
    * @return {Object}
    */
   function checkVA(){
      stage_width = stage.innerWidth || stage.clientWidth;
      stage_height = stage.innerHeight || stage.clientHeight;

      element_width = element.offsetWidth;
      element_height = element.offsetHeight;

      sx_min = stage.pageXOffset || stage.scrollLeft;
      sy_min = stage.pageYOffset || stage.scrollTop;
      sx_max = sx_min + stage_width;
      sy_max = sy_min + stage_height;

      ex_min = element.getBoundingClientRect().left + sx_min;
      ey_min = element.getBoundingClientRect().top + sy_min;
      ex_max = ex_min + element_width;
      ey_max = ey_min + element_height;

      vx = getAxisVA(sx_min, sx_max, ex_min, ex_max, stage_width, element_width);
      vy = getAxisVA(sy_min, sy_max, ey_min, ey_max, stage_height, element_height);
      sq = getSquareVA(vx.num, vy.num, element_width, element_height);


      clearTimeout(tid);
      if(sq >= percentage && callback){
         if(iab){
            tid = setTimeout(callback, 1000);
         }else{
            callback();
         }
      }

      return { x: vx.per, y: vy.per, square: sq };
   }

   return { check: checkVA };
}
