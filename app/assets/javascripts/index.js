$(document).on('turbolinks:load', function() {
  var chatusers = $("#user-search-result");
  function appendUsers(user) {
    var html = 
    `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`
  chatusers.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = 
    `<div class="chat-group-user clearfix">
    <div class='listview__element--right-icon'>${ msg }</div>
    </div>`
  chatusers.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUsers(user);
        });
      }
      else{
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('error');
    });
  });

$(document).on("click", ".chat-group-user__btn--add", function() {
  var parent = $(this).parent();
  var name = $(this).data('userName');
  var id = $(this).data('userId');
  var html = 
  `<div class='chat-group-user'>
  <input name='group[user_ids][]' type='hidden' value='${id}'>
  <p class='chat-group-user__name'>${name}</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`;
$("#user-group-member").append(html);
  $(parent).remove();
  });
  $(document).on("click", ".js-remove-btn", function() {
    var parent = $(this).parent();
    $(parent).remove();
    });
});


document.addEventListener('turbolinks:load', function(event) {
  
});