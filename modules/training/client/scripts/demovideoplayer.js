$(document).ready(function(){
  $(".Video").click(function(){
    var iframe = $(this).html();
    $(".VideoPlayer").html("");
    $("#Title").html($(this).data("title"));
    $("#Description").html($(this).data("desc"));

    $(".VideoPlayer").html(iframe);
    $(".Player").addClass("active");
    setTimeout(function(){
      $(".Info").addClass("active");
    },1000);
  });
  $(".Cross").click(function(){
    $(".Info").removeClass("active");
    setTimeout(function(){
      $(".VideoPlayer").html("");
      $(".Player").removeClass("active");
    },1000);
  });
})
