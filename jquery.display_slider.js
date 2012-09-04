/* jquery Display Slider 
   
   Revision log:
   0.01 release, fade in
   
*/

(function($) {
  $.fn.extend({
    display_slider: function(options){
  
    var display = null;   
    var slides = null;
    var current_idx = 0;
    var playing = null;
    var play_timer = null;
    var navigation = null;
    
    
    var defaults = {
      autoplay :true,         
      show_navigation: true,
      delay:5000,
      transition_speed: 1000,
      start_idx:0,
      change_on_hover:false

    };
    var options = $.extend(defaults, options);

 
    display = this;
    
    init();
 
    
    function init(){
      
      n = 0;
      
      slides = display.children();
      navigation = $('<div class="slide-navigation"><ol></ol></div>');
      navigation.css({'position':'absolute'});
      current_idx = options.start_idx;
      slides.each(
        function(){
          $(this).css({'position':'absolute','top':0,'left':0});
          if(n!= current_idx ){
            $(this).hide();           
          }else{
            $(this).show();  
          }
          
          var bt = $('<a href="#">'+ (n+1)+'</a>');
          bt.data({'idx':n})
          bt.click(function(){
            show_slide($(this).data('idx'));
            return false;
          });
          
          if(options.change_on_hover){
            bt.hover(function(){$(this).trigger('click');});
          }
          
          var bt_item = $('<li></li>');
          if(n== current_idx){
            bt_item.addClass('current');  
          }
          bt_item.append(bt);
          navigation.find('ol').append(bt_item);
          
          n++;
        }
      );
      
      if(options.show_navigation){
        display.append(navigation);  
      }
      if(options.autoplay){
        play();  
      }
        
    }
    
    function play(){
      playing = true;
      play_timer = setTimeout(function(){next(); }, options.delay);
         
    }
    function next(){ 
 
      clearTimeout(play_timer);

      transition_out(current_idx);
       
      current_idx +=1;
      if(current_idx > slides.length-1)current_idx = 0 // back to 0
      
      transition_in(current_idx)
      
       
      if(playing){
        play();  
      }
    }
    
    function transition_in(idx){
 
      $(slides[idx]).fadeIn(options.transition_speed);
      $(navigation.find('ol li')[idx]).addClass('current');
      
    }
    
    function transition_out(idx){
      $(slides[idx]).fadeOut(options.transition_speed);
      $(navigation.find('ol li')[idx]).removeClass('current');
      
    }
    
    function show_slide(idx){
      clearTimeout(play_timer);
      play_timer = null;
      if(idx!= current_idx){
        transition_out(current_idx);
        current_idx = idx;
        transition_in(idx);  
      }
    }
    
 
  }
  });
})(jQuery); 