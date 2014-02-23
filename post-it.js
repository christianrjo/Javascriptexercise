var Board = function( selector ) {
  var self = this
  self.postIts = []
  var $elem = self.$elem = $( selector );

  function addClickListener(){
    $elem.on("click", function(e){
      self.makeAPostit(e.pageX, e.pageY)
    })
  }

  function initialize() {
    addClickListener()
  };

  initialize();
};

Board.prototype.makeAPostit = function(x, y){
  var postIt = new PostIt(x, y,".post-it", ".header" )
  this.postIts.push(postIt)
  this.$elem.append(postIt.$elem)


  postIt.stopPropagation();
  postIt.addADragListener();
  postIt.addClickListener();
}

var PostIt = function(x, y, class_name, handle) {
  var $elem = this.$elem = $("<div class='post-it'><div class='header'><a class='closeNote' href='#'>x</a></div><div class='content' contenteditable='true'></div></div>")
  $elem.css({left:x,top:y})
  this.class_name = class_name
  this.handle = handle
  //unbind post it from #board click listener?

};

PostIt.prototype.stopPropagation = function(){
  $(this.class_name).on('click', function(e){
    e.stopPropagation() 
  })
}

PostIt.prototype.addADragListener = function(){
  $(this.class_name).draggable({handle: ".header"})
}

 PostIt.prototype.addClickListener = function(){
  $(".closeNote").on('click', function(e){
    $(this).closest('.post-it').remove()
    e.stopPropagation()
  })
 }

$(function() {
  // This code will run when the DOM has finished loading
  new Board('#board');
});
