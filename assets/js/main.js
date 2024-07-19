gsap.registerPlugin(ScrollTrigger);
jQuery(function ($) {
  const topSection = gsap.timeline({
    scrollTrigger: {
      trigger: "#banner-hero",
      pin: true,
      pinSpacing: false,
      markers: true,
      start: "top top",
      end: "+=3000%",
      scrub: 0.6,
      ease: "none",
    },
  });

  var panelWrapSlide;
  if ($(window).width() > 767) {
    panelWrapSlide = -56.7;
  } else {
    panelWrapSlide = -67.87;
  }
  var maskEnlarge =
    ((Math.max($(window).width(), $(window).height()) - 150) /
      Math.max($(window).width(), $(window).height())) *
    25;

  topSection
    .to(
      "#banner-hero",
      {
        ease: "none",
        xPercent: panelWrapSlide,
      },
      "0%"
    )
    .to(
      ".bear-character-col",
      {
        ease: "none",
        xPercent: -155,
      },
      "<25%"
    )
    // .to(
    //   "#cross > path",
    //   {
    //     scale: maskEnlarge,
    //     rotate: 135,
    //     duration: 1,
    //   },
    //   "<75%"
    // )
    .to(".banner-inner-1", {
      opacity: 0,
      duration: 0,
    });
  // .to("#cross > path", {
  //   duration: 1,
  // })
  // .to("#cross > path", {
  //   scale: 0,
  //   rotate: 270,
  //   duration: 1,
  // });

  // 	RAWR Popup Text
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".banner-text",
        start: "20% top",
        end: "20% top",
        scrub: 0.6,
        ease: "back",
      },
    })
    .from(".rawr-popup", {
      ease: "back",
      scale: 0,
    });

  //      BEAR CHARACTER
  LottieScrollTrigger({
    target: "#bear-character",
    path: "/src/assets/js/banner-bear.json",
    speed: "fast",
    scrub: 0.6, // seconds it takes for the playhead to "catch up"
  });

  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: "+=2000", medium: "+=800", fast: "+=250" },
      st = {
        //a dummy value to prevent bear from jumping (not sure why, will fix later)
        trigger: ".dummy-dummy",
        //trigger: target,
        pin: true,
        start: "top top",
        end: speeds[vars.speed] || "top",
        scrub: 0.6,
      },
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path,
      });
    for (let p in vars) {
      // let users override the ScrollTrigger defaults
      st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function () {
      gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        ease: "none",
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
        scrollTrigger: st,
      });
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      // ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return animation;
  }
  $(document).ready(function () {
    if ($("body")) {
      gsap.from(".bear-character-col", {
        scale: 0.4,
        ease: "back",
      });
    }
  });
});
