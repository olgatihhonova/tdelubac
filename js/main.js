$(document).ready(() => {

const $nav = $('header').children('nav'),
      $table = $nav.find('table'),
      $tbody = $nav.find('tbody'),
      $name = $table.find('.name'),
      $job = $table.find('.job'),
      $title = $table.find('.title'),
      $title_h1 = $title.find('h1'),
      $filler_span = $table.find('.filler'),
      $dixi_span = $table.find('.dixi'),
      $contact = $('.ref-contact'),
      $delayed_a = $('.delay'),
      $fading_elements = $('.fadeIn');

// delay page transition
$delayed_a.click(function(event){
    event.preventDefault();
    var link = $(this).attr('href');
    setTimeout(function() {
        window.location.href = link;
    }, 1500);
});

// make elements with class fadeIn (main, footer) fade in
$fading_elements.animate({opacity: 1}, 1500);


// update navigation menu
function updateMenu(item_menu) {
  $fading_elements.animate({opacity: 0}, 150);

  if (!$table.hasClass('') && !$table.hasClass(item_menu)) {
    $table.removeClass();
    $dixi_span.removeClass('collapse');
    $filler_span.removeClass('full');
  } else {
    $tbody.toggleClass('scale');
    $title_h1.toggleClass('rotate');
    $name.toggleClass('hline');
    $title.toggleClass('vline');
  }
  if (item_menu === 'title_menu' || item_menu === 'contact_menu') {
    $dixi_span.toggleClass('collapse');
    $filler_span.toggleClass('full');
  }

  $table.toggleClass(item_menu);
}

$name.children('a').click( () => {
  updateMenu('name_menu');
});

$job.children('a').click( () => {
  updateMenu('job_menu');
});

$title.children('a').click( () => {
  updateMenu('title_menu');
});

$contact.find('a').click( () => {
  updateMenu('contact_menu');
});


// function classReset(class1, class2) {
//   return new Promise( (resolve, reject) => {
//     if ($table.hasClass(class1)) {
//       $table.removeClass(class1);
//       $title_h1.toggleClass('rotate');
//     }
//     if ($table.hasClass(class2)) {
//       $table.removeClass(class2);
//       $title_h1.toggleClass('rotate');
//     }
//     resolve();
//   });
// }
//
// function updateMenu(clicked, class1, class2) {
//   classReset(class1, class2)
//     .then( () => {
//       $table.toggleClass(clicked);
//       $title_h1.toggleClass('rotate');
//     });
// }




//
//
// // List of clickable objects in the menu
// const clickers = ["#header-name", "#header-job", "#header-title", "#ref-contact"];
// // Create one event listener per clicker
// const menuEventListeners = [];
// clickers.forEach( (clicker) => {
//     menuEventListeners.push(document.querySelector(clicker));
// });
// // Create the handler that will allow / forbid transitions
// const handler = {
//     locked: false,
//     startRunListners: () => {
//         menuEventListeners.forEach( (el) => {
//             el.addEventListener("transitionrun", () => {
//                 handler.locked = true;
//             });
//         });
//     },
//     startEndListners: () => {
//         menuEventListeners.forEach( (el) => {
//             el.addEventListener("transitionend", () => {
//                 handler.locked = false;
//                 updateRefs();
//                 activateArticle();
//                 console.log("pass");
//             });
//         });
//     }
// };
// // Starting event listeners
// handler.startRunListners();
// handler.startEndListners();
//
// // Making clickers clickable
// clickers.forEach( (id, i) => {
//     $(id+" a").click( (event) => {
//         event.preventDefault();
//         // Save scrollPos to avoid jumping on transition
//         // scrollPos = $(window).scrollTop();
//         window.location.href = $(id+" a").attr("href");
//     });
// });
// // Go back to main menu
// function mainMenu() {
//     deactivateClickers();
//     setCSS("main");
// }
// // Activate a given menu
// function activateMenu(id) {
//     deactivateClickers();
//     $(id).addClass("active");
//     setCSS(id);
// }
// // deactivate all clickers
// function deactivateClickers() {
//     clickers.forEach( (id, i) => {
//         $(id).removeClass("active");
//     });
// }
// // Setting active menu button href to #
// function updateRefs() {
//     clickers.forEach( (id, i) => {
//         if( $(id).hasClass("active") ) {
//             $(id+" a")[0].href="#";
//         } else {
//             $(id+" a")[0].href=articles[i];
//         }
//     });
// }
//
// ////////////////////////////////////////
// ////////////    Articles    ////////////
// ////////////////////////////////////////
//
// // List of articles !! must be in same order than clickers !!
// const articles = ["#about", "#data-science", "#phd", "#contact"];
//
// function deactivateArticles() {
//     articles.forEach( (article) => {
//         $(article).removeClass("active");
//         setTimeout( () => {
//             $(article).removeClass("overflow");
//         }, 500);
//     });
// }
//
// function activateArticle() {
//     // Reset position to top of article        // console.log($(id));
//         // if ($(id).length === 0) {
//         //     // do nothing
//         // } else
//     // scrollPos = 0;
//     articles.forEach( (article, i) => {
//         if ($(clickers[i]).hasClass("active")) {
//             $(article).addClass("active");
//             $(article).addClass("overflow");
//         }
//     });
// }
//
// ////////////////////////////////////////
// /////////     Load page     ////////////
// ////////////////////////////////////////
// $window = $(window);
// // Check hash on load
// $window.on("load", () => {checkURL()});
// // Always save scroll position
// let scrollPos = 0;
// $window.on("scroll", () => {
//     scrollPos = $window.scrollTop();
// });
// // Check hash when already on website
// $window.on("hashchange", (event) => {
//     event.preventDefault();
//     $window.scrollTop(scrollPos);
//     deactivateArticles();
//     checkURL();
// });
// // Check URL and activate if needed
// function checkURL() {
//     let url = window.location.href;
//     let oneArticleActivated = articles.some( (article, i) => {
//         if (url.search(article)>0) {
//             activateMenu(clickers[i]);
//             return true;
//         } else { return false;}
//     })
//     if (!oneArticleActivated) {
//         mainMenu();
//     }
// }
//
// ////////////////////////////////////////
// /////////  CSS ugly function  //////////
// ////////////////////////////////////////
//
// function setCSS(id) {
//     switch(id) {
//         case "#header-name":
//             // Adding bands
//             $("#lower-band").addClass("active");
//             $("#upper-band").removeClass("active");
//             // vertical adjustment
//             $("#header-name").css("height","93%");
//             $("#header-job").css("height","7%");
//             $("#vline").css("top","40%");
//             $("#vline").css("height","18%");
//             $("#header-title").css("top","40%");
//             // horizontal adjustment
//             $("#container-inner").css("width","96%");
//             $("#header-title").css("width","4%");
//             $("#hline").css("width","15.5%")
//             // text adjustment
//             $("header h1").css("font-size","1.72vw");
//             $("#header-title h1").css("font-size","1.72vw");
//             $("#header-job h1").css("font-size","1.72vw");
//             $("header h1").css("margin-top", "0.5vw");
//             $("header h1").css("margin-bottom", "0.5vw");
//             $("header h1").css("margin-right", "1vw");
//             $("header span").css("font-size","1.2vw");
//             $("#header-title span").css("font-size","1.2vw");
//             $("#header-job span").css("font-size","1.2vw");
//             $("#header-title h1").css("transform", "translate(-55%,75%) rotate(90deg)");
//             // If coming from PhD menu need to reset opacity and spacing
//             $("#header-job span").css("opacity","1");
//             $("#header-job span").css("letter-spacing","");
//             $("#header-name span").css("opacity","1");
//             $("#header-name span").css("letter-spacing","");
//             // Set article h1 color
//             $("#about h1").css("color", "#0666B9");
//
//             break;
//
//         case "#header-job":
//             // Adding bands
//             $("#upper-band").addClass("active");
//             $("#lower-band").removeClass("active");
//             // vertical adjustment
//             $("#header-name").css("height","7%");
//             $("#header-job").css("height","93%");
//             $("#vline").css("top","-40%");
//             $("#vline").css("height","18%");
//             $("#header-title").css("top","-40%");
//             // horizontal adjustment
//             $("#container-inner").css("width","96%");
//             $("#header-title").css("width","4%");
//             $("#hline").css("width","15.5%")
//             // text adjustment
//             $("header h1").css("font-size","1.72vw");
//             $("#header-title h1").css("font-size","1.72vw");
//             $("#header-name h1").css("font-size","1.72vw");
//             $("header h1").css("margin-top", "0.1vw");
//             $("header h1").css("margin-bottom", "0.6vw");
//             $("header h1").css("margin-right", "1vw");
//             $("header span").css("font-size","1.2vw");
//             $("#header-title span").css("font-size","1.2vw");
//             $("#header-name span").css("font-size","1.2vw");
//             $("#header-title h1").css("transform", "translate(-55%,-65%) rotate(90deg)");
//             // If coming from PhD menu need to reset opacity and spacing
//             $("#header-job span").css("opacity","1");
//             $("#header-job span").css("letter-spacing","");
//             $("#header-name span").css("opacity","1");
//             $("#header-name span").css("letter-spacing","");
//             // Set article h1 color
//             $("#data-science h1").css("color", "#0D9099");
//
//             break;
//
//         case "#header-title":
//             // Adding bands
//             $("#lower-band").removeClass("active");
//             $("#upper-band").removeClass("active");
//             // vertical adjustment
//             $("#header-name").css("height","50%");
//             $("#header-job").css("height","50%");
//             $("#vline").css("top","-5%");
//             $("#vline").css("height","40%");
//             $("#header-title").css("top","0%");
//             // horizontal adjustment
//             $("#container-inner").css("width","5%");
//             $("#header-title").css("width","95%");
//             $("#hline").css("width","95%")
//             // text adjustment
//             $("header h1").css("font-size","1.72vw");
//             $("header h1").css("margin-top", "0.1vw");
//             $("header h1").css("margin-bottom", "0.6vw");
//             $("header h1").css("margin-right", "1vw");
//             $("header span").css("font-size","1.2vw");
//             // job
//             $("#header-job h1").css("margin-left","0vw");
//             $("#header-job h1").css("margin-top","0.8vw");
//             $("#header-job h1").css("font-size","1.72vw");
//             $("#header-job span").css("opacity","0");
//             $("#header-job span").css("font-size","1.2vw");
//             $("#header-job span").css("letter-spacing","-20px");
//             // name
//             $("#header-name h1").css("margin-left","0vw");
//             $("#header-name h1").css("font-size","1.72vw");
//             $("#header-name span").css("opacity","0");
//             $("#header-name span").css("font-size","1.2vw");
//             $("#header-name span").css("letter-spacing","-20px");
//             // title
//             $("#header-title h1").css("transform", "translate(-55%,10%) rotate(90deg)");
//             // Set article h1 color
//             $("#phd h1").css("color", "#F8C987");
//
//
//             break;
//
//         case "main":
//             // Adding bands
//             $("#lower-band").removeClass("active");
//             $("#upper-band").removeClass("active");
//             // vertical adjustment
//             $("#header-name").css("height","50%");
//             $("#header-job").css("height","50%");
//             $("#vline").css("top","-5%");
//             $("#vline").css("height","40%");
//             $("#header-title").css("top","0%");
//             // horizontal adjustment
//             $("#container-inner").css("width","68%");
//             $("#header-title").css("width","32%");
//             $("#hline").css("width","70%")
//             // text adjustment
//             $("header h1").css("font-size","5vw");
//             $("#header-title h1").css("font-size","5vw");
//             $("#header-job h1").css("font-size","5vw");
//             $("#header-name h1").css("font-size","5vw");
//             $("header h1").css("margin-top", "0.15vw");
//             $("header h1").css("margin-bottom", "1vw");
//             $("header h1").css("margin-right", "2vw");
//             $("header span").css("font-size","5vw");
//             $("#header-title span").css("font-size","3.5vw");
//             $("#header-name span").css("font-size","3.5vw");
//             $("#header-job span").css("font-size","3.5vw");
//             $("#header-title h1").css("transform", "");
//             $("#header-job span").css("opacity","1");
//             $("#header-job span").css("letter-spacing","");
//             $("#header-name span").css("opacity","1");
//             $("#header-name span").css("letter-spacing","");
//
//             break;
//
//
//         case "#ref-contact":
//         // vertical adjustment
//         $("#header-name").css("height","7%");
//         $("#header-job").css("height","93%");
//         $("#vline").css("top","-40%");
//         $("#vline").css("height","18%");
//         $("#header-title").css("top","-40%");
//         // horizontal adjustment
//         $("#container-inner").css("width","17%");
//         $("#header-title").css("width","83%");
//         $("#hline").css("width","90%")
//         // text adjustment
//         $("header h1").css("font-size","1.72vw");
//         $("#header-title h1").css("font-size","1.72vw");
//         $("#header-name h1").css("font-size","1.72vw");
//         $("header h1").css("margin-top", "0.1vw");
//         $("header h1").css("margin-bottom", "0.6vw");
//         $("header h1").css("margin-right", "1vw");
//         $("header span").css("font-size","1.2vw");
//         $("#header-title span").css("font-size","1.2vw");
//         $("#header-name span").css("font-size","1.2vw");
//         $("#header-title h1").css("transform", "translate(-55%,-65%) rotate(90deg)");
//         // If coming from PhD menu need to reset opacity and spacing
//         $("#header-job span").css("opacity","1");
//         $("#header-job span").css("letter-spacing","");
//         $("#header-name span").css("opacity","1");
//         $("#header-name span").css("letter-spacing","");
//         // Set article h1 color
//         $("#data-science h1").css("color", "#0D9099");
//
//             break;
//     }
// }

});
