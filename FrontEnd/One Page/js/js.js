startList = function() {
    if (document.all&&document.getElementById) {
    navRoot = document.getElementById("menuDropDown");
    for (i=0; i<navRoot.childNodes.length; i++) {
    node = navRoot.childNodes[i];
    if (node.nodeName=="LI") {
    node.onmouseover=function() {
    this.className+=" over";
      }
      node.onmouseout=function() {
      this.className=this.className.replace
      (" over", "");
       }
       }
      }
     }
    }
    window.onload=startList;
/*-------------------------------------------------------------------------------------------------------------------- */
// Efeito Scroll
$(document).ready(function(){
    
    $(".navbar a, footer a[href='#DOEPage']").on('click', function(event) {
     
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
  
    
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          window.location.hash = hash;
        });
      } 
    });
    
    $(window).scroll(function() {
      $(".slideanim").each(function(){
        var pos = $(this).offset().top;
  
        var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
      });
    });
  })
/* --------------------------------------------------------------------------------------------------------------------- */
/*Modal*/ 
$(function(){
    $(document).ready(function(){
        $("#myBtn").click(function(){
            $("#myModal").modal();
        });
    });
});