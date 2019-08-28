function init() {
    // console.log("Hello World");
    getItems();
    $(document).on('click', '.delete', deleteItems)
}

$(document).ready(init);

function getItems(){

  $.ajax({
    url:  'http://157.230.17.132:3010/todos',
    method: 'GET',
    success: function(data){
      console.log(data);
      printItems(data);

    },
    error: function(){
      alert('errore');
    }

  });

}
function printItems(toDoItems){
  var source = $('#item-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < toDoItems.length; i++) {
    var item= toDoItems[i];

    var context = {
      item: item.text,
      id: item.id
    };

    var html = template(context);
    $('.container').append(html);
  };
}

function deleteItems(){
 var item = $(this);
 var deletedItem = item.parent();
 var deletedId = deletedItem.data('id');

 $.ajax({
   url:  'http://157.230.17.132:3010/todos/'+ deletedId,
   method: 'DELETE',
   success: function(){
     console.log('item deleted'+ deletedId);
     deletedItem.remove();
   },
   error: function(){
     alert('errore');
   }
 });
}
