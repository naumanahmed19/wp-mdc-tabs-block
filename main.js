

document.addEventListener("DOMContentLoaded", function() {



    var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
    var contentEls = document.querySelectorAll('.brand-tab-screen');
    contentEls[0].classList.add('brand-tab-screen--active');
    tabBar.listen('MDCTabBar:activated', function(event) {
    // Hide currently-active content
    document.querySelector('.brand-tab-screen--active').classList.remove('brand-tab-screen--active');
    // Show content for newly-activated tab
    contentEls[event.detail.index].classList.add('brand-tab-screen--active');
    });
     
  });