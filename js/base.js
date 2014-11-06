$(function(){
  initScrollbg();
  // 发牌效果
  coolcard();
});

// scrore bg effect
function initScrollbg(){
  $('.js-scrollbg').each(function(){
    var toTop = $(this).offset().top;
    var scroll_pos;
    var sectionHeight = $(this).height();
    var thisdom = $(this);
    $(window).scroll(function(){
      scroll_pos = document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;  
      var offset = (scroll_pos - toTop + $(window).height()) / sectionHeight * 50;

      if (offset > 100) {
        offset = 100;
      } else if (offset < 0) {
        offset = 0;
      }

      thisdom.css('background-position-y', offset + '%');

      console.log(offset);
    });
  });
}


function coolcard() {
  // 载入时或者滑动到视图时载入动画
  setTimeout(function() {
    $('#coolcard').addClass('on');
  }, 500);
  

  $('#coolcard .bosscard').click(function(){
    setTimeout(function() {
      $('#coolcard .bosscard').nextAll('.carditem').addClass('anim-goback');
      setTimeout(function() {
        $('#coolcard .bosscard').nextAll('.carditem').removeClass('anim-goback');
      }, 700);
    }, 500);
    
    // var cardSwitch = $(this).attr('data-switch');
    // if(cardSwitch == 'on') {
    //   $(this).attr('data-switch','off')
    //   $(this).nextAll('.carditem').addClass('anim-goback');
    // } else {
    //   $(this).attr('data-switch','on')
    //   $(this).nextAll('.carditem').removeClass('anim-goback');
    // }
  });
}