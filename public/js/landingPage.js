
  $(document).on("click", '.image-container', function(){
    console.log($(this));
    console.log("called image container click");
    $('.image-container').removeClass("selected");
    $(this).addClass("selected");
  })