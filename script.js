$(function () {
  // Reveal sections as they enter the viewport.
  function revealOnScroll() {
    var trigger = window.innerHeight * 0.88;
    $(".reveal:not(.is-visible)").each(function () {
      if (this.getBoundingClientRect().top < trigger) {
        $(this).addClass("is-visible");
      }
    });
  }
  revealOnScroll();
  $(window).on("scroll resize", revealOnScroll);

  // Add a subtle shadow to the sticky navigation after scrolling.
  function updateHeader() {
    $(".site-header").toggleClass("scrolled", $(window).scrollTop() > 12);
  }
  updateHeader();
  $(window).on("scroll", updateHeader);

  // Mobile navigation.
  $(".menu-toggle").on("click", function () {
    var isOpen = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!isOpen));
    $(".main-nav").toggleClass("open", !isOpen);
  });
  $(".main-nav a").on("click", function () {
    $(".main-nav").removeClass("open");
    $(".menu-toggle").attr("aria-expanded", "false");
  });

  // Smooth in-page navigation.
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").stop().animate({
        scrollTop: target.offset().top - 78
      }, 650);
    }
  });

  $("#year").text(new Date().getFullYear());

  // Front-end demo: open the visitor's email client with the request prefilled.
  $("#quoteForm").on("submit", function (event) {
    event.preventDefault();
    var form = this;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var data = {
      name: $.trim($(form).find('[name="name"]').val()),
      phone: $.trim($(form).find('[name="phone"]').val()),
      email: $.trim($(form).find('[name="email"]').val()),
      service: $(form).find('[name="service"]').val(),
      details: $.trim($(form).find('[name="details"]').val())
    };
    var subject = encodeURIComponent("Roofing estimate request — " + data.service);
    var body = encodeURIComponent(
      "Hello C.H.A. Roofing,\n\nI'd like to discuss a roofing project.\n\n" +
      "Name: " + data.name + "\nPhone: " + data.phone + "\nEmail: " + data.email +
      "\nService: " + data.service + "\nProject details: " + (data.details || "Not provided") +
      "\n\nPlease contact me to discuss the next steps."
    );
    $(".form-status").text("Your email app should open with your request details. Please review and send the message.");
    window.location.href = "mailto:?subject=" + subject + "&body=" + body;
  });
});