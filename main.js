
//TODO: Refactoring...
document.addEventListener("DOMContentLoaded", function() {
  

    const ele = document.querySelectorAll('.mdc-tab-bar')
    if(!ele) return

    ele.forEach((tabElement,index)=>{
      var tabBar = new mdc.tabBar.MDCTabBar(tabElement);
      let tabWrap = document.querySelectorAll('.tab-wrap');
      var contentEls = tabWrap[index].querySelectorAll('.brand-tab-screen');
      contentEls[0].classList.add('brand-tab-screen--active');
      tabBar.listen('MDCTabBar:activated', function(event) {
      // Hide currently-active content

      if(tabWrap[index].querySelector('.brand-tab-screen--active'))
        tabWrap[index].querySelector('.brand-tab-screen--active').classList.remove('brand-tab-screen--active');
      // Show content for newly-activated tab
      contentEls[event.detail.index].classList.add('brand-tab-screen--active');
      });
      
    })
  });
