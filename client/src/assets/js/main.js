window.onload = () => {
  tabEvent.init();
  owlCarousel.init();
  category.init();
  readingPage.init();
  seeMore.init();
  showTime();
  qualityControl.init();
  menu.init();
};


var menu = {
  init:function(){
        this.scrollMenu();
    },

          
      scrollMenu:function(){
          var scrollHeader = document.querySelector(".header");
          window.onscroll = function() {
              if(document.body.scrollTop > 100 || 
                  document.documentElement.scrollTop > 100)
                  {
                 scrollHeader.classList.add("show__header");
              } else{
                  scrollHeader.classList.remove("show__header");
              }
          };
      },
};


/* ============================= 1, quality Control ============================= */
const qualityControl = {
  init: function () {
      this.setupQuanlity(
          ".js-qty-increase-2",
          ".js-qty-decrease-2",
          ".js-product-qty-2"
      );
  },
  setupQuanlity: function (increase, decrease, quality) {
      var minVal = 1,
          maxVal = 12;
      $(increase).on("click", function () {
          var $parentElm = $(this).parents(".option-wrap");

          var value = $parentElm.find(quality).val();
          if (value < maxVal) {
              value++;
          }
          $parentElm.find(quality).val(value);
      });
      // Decrease product quantity on cart page
      $(decrease).on("click", function () {
          var $parentElm = $(this).parents(".option-wrap");

          var value = $parentElm.find(quality).val();
          if (value > 1) {
              value--;
          }
          $parentElm.find(quality).val(value);
      });
  },
};
const tabEvent = {
  init: function () {
    this.setupTabEvent();
  },
  setupTabEvent: function () {
    const main = document.querySelectorAll(".tab-wrapper");
    if (main.length !== 0) {
      main.forEach((mainTarget) => {
        const tabClick = mainTarget.querySelectorAll(".tabs-group .tab-item");
        const tabMain = mainTarget.querySelectorAll(
          ".tabs-main-group .tab-item"
        );

        tabClick.forEach((item, index) =>
          item.addEventListener("click", () => {
            tabClick.forEach((i) => i.classList.remove("active"));
            tabMain.forEach((i) => i.classList.remove("active"));

            tabClick[index].classList.add("active");
            tabMain[index].classList.add("active");
            let btnWrap = $(".btn-readmore");
            btnWrap.attr("data-tab", tabMain[index].getAttribute("data-tab"));
          })
        );
      });
    }
  },
};

const owlCarousel = {
  init: function () {
    this.setupListVideoCarousel();
    this.setupListBookCarousel();
    this.setupBannerCarousel();
    this.setupProductSellCarousel();
    this.setupProductFlashSaleCarousel();
    this.setupProductSimpleCarousel();
  },
  setupListVideoCarousel: function () {
    const $owl = $("#list-video__box.owl-carousel").owlCarousel({
      responsive: {
        0: {
          items: 3.5,
        },
      },
      loop: true,
      rewind: false,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      mouseDrag: true,
      nav: true,
      dots: false,
      navText: [
        "<img src='./assets/icons/icon-angle-left-white.svg'>",
        "<img src='./assets/icons/icon-angle-right-white.svg'>",
      ],
      autoWidth: false,
      margin: 0,
    });
    $owl.trigger("refresh.owl.carousel");
  },
  setupListBookCarousel: function () {
    var $owl = $("#list-book__box.owl-carousel").owlCarousel({
      responsive: {
        0: {
          items: 2.2,
        },
        768: {
          items: 5,
        },
      },
      loop: true,
      rewind: false,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      mouseDrag: true,
      dots: false,
      navText: [
        "<img src='./assets/icons/icon-angle-left-white.svg'>",
        "<img src='./assets/icons/icon-angle-right-white.svg'>",
      ],
      nav: true,
      autoWidth: false,
      margin: 0,
    });
    $owl.trigger("refresh.owl.carousel");
  },
  setupBannerCarousel: function () {
    var $owl = $("#banner-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 1,
        },
      },
      loop: true,
      rewind: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      mouseDrag: true,
      navText: [
        "<img src='./assets/icons/icon-angle-left-white.svg'>",
        "<img src='./assets/icons/icon-angle-right-white.svg'>",
      ],
      nav: true,
      dots: true,
    });
    $owl.trigger("refresh.owl.carousel");
  },
  setupProductSellCarousel: function () {
    var $owl = $("#prodcut-selling-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
        },
        420: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1000:{
          items : 5,
        }
      },
      margin : 10,
      loop: true,
      rewind: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      mouseDrag: true,
      nav: true,
      dots: true,
      navText:false
    });
    $owl.trigger("refresh.owl.carousel");
  },
  setupProductFlashSaleCarousel: function () {
    var $owl = $("#prodcut-flash-sale-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
        },
        420: {
          items: 2,
        },
        768: {
          items: 2,
        },
        1000:{
          items : 5,
        }
      },
      margin : 10,
      loop: true,
      rewind: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      mouseDrag: true,
      nav: true,
      dots: true,
      navText:false
    });
    $owl.trigger("refresh.owl.carousel");
  },
  setupProductSimpleCarousel: function () {
    var $owl = $("#product-detail-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        dots: false,
        callbacks: true,
        URLhashListener: true,
        autoplayHoverPause: true,
        startPosition: 'URLHash'
    });
    $owl.trigger("refresh.owl.carousel");
  },
};



const category = {
  init: function () {
    this.configEventExpand();
    this.openCloseCategory();
    this.selectOptions();
    this.openSetting();
  },
  configEventExpand: function () {
    const main = document.querySelector("section.section-category");
    if (main) {
      const allLists = main.querySelectorAll(".category-item");
      allLists.forEach((item) =>
        item.addEventListener("click", () => {
          item.classList.toggle("active");
        })
      );
    }
  },
  openCloseCategory: function () {
    const main = document.querySelector(".section-category-mobile");
    const btnOpen = document.querySelector(".header-mobile .js-open-category");
    if (main && btnOpen) {
      const overlay = main.querySelector(".category-overlay");
      const btnClose = main.querySelector(".category-close");

      btnOpen.addEventListener("click", () => {
        main.classList.add("active");
      });
      overlay.addEventListener("click", () => {
        main.classList.remove("active");
      });
      btnClose.addEventListener("click", () => {
        main.classList.remove("active");
      });
    }
  },
  selectOptions: function () {
    const allSectionOption = document.querySelectorAll(
      ".category-filter .list-select"
    );
    allSectionOption.forEach((item) => {
      const allOptions = item.querySelectorAll(".button-component");
      allOptions.forEach((btn, btnIndex) =>
        btn.addEventListener("click", () => {
          allOptions.forEach((ele, indexEle) => {
            if (indexEle !== btnIndex) ele.classList.remove("primary-light");
          });
          btn.classList.toggle("primary-light");
        })
      );
    });
  },
  openSetting : function () {
    const settingClick = document.querySelector(".click-setting");
    if(settingClick){
      const openSetting = document.querySelector(".mobile-none");
    const mbSetting = document.querySelector(".mb-setting ");
    settingClick.addEventListener("click", () => {
      openSetting.classList.toggle("active");
      if(mbSetting.className.includes('active')){
        settingClick.innerText  = "Close";
      }else{
        settingClick.innerText  = "Setting";
      } 
    })
    }
    
  }
};

const readingPage = {
  init: function () {
    this.sidebarConfig();
  },
  sidebarConfig: function () {
    const main = document.querySelector("body.reading-wrapper");
    if (main) {
      const btnOpen = main.querySelector(".header-btn-sidebar");
      const btnIconOpen = "./assets/icons/icon-list-video-blue.svg";
      const btnIconClose = "./assets/icons/icon-arrow-left-gray.svg";

      btnOpen.addEventListener("click", () => {
        main.classList.toggle("open-sidebar");
        const img = btnOpen.querySelector("img");
        if (main.className.includes("open-sidebar")) {
          img.src = btnIconClose;
          img.style.width = "18px";
          img.style.transform = "translateY(0px)";
        } else {
          img.src = btnIconOpen;
          img.style.width = "20px";
          img.style.transform = "translateY(1px)";
        }
      });
    }
  },
};

const seeMore = {
  init() {
    this.config();
  },
  config() {
    const main = document.querySelectorAll('.see-more-wrapper')
    main.forEach((item, index) => {
      const btnSeeMore = item.querySelector('.see-more-btn')
      btnSeeMore.addEventListener('click', () => {
        item.classList.toggle('see-more-expand')
        const textBtn = btnSeeMore.querySelector('span')
        const imgBtn = btnSeeMore.querySelector('img')
        if (item.className.includes('see-more-expand')) {
          textBtn.innerHTML = 'Thu gọn'
          imgBtn.src = './assets/icons/icon-angle-up-blue.svg'
        } else {
          textBtn.innerHTML = 'Xem thêm'
          imgBtn.src = './assets/icons/icon-angle-down-blue.svg'
        }
      })
    })
  },
};

function showTime () {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  let hi = document.querySelectorAll(".flash-time .h");
  let mi = document.querySelectorAll(".flash-time .i");
  let si = document.querySelectorAll(".flash-time .s");
  hi.forEach(item  => item.innerText  = h)
  mi.forEach(item  => item.innerText  = m)
  si.forEach(item  => item.innerText  = s)
  setTimeout(showTime, 1000);
}
