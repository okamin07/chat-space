
$(document).on('turbolinks:load', function() {
function buildHTML(message){
  var imageclass  = 
  message.image == null ? `` : `<img class="lower-message__image" src="${message.image}"></img>`
  var html = 
  `<div class="contents__message-box" data-id=${message.id}>
    <div class="message-top">
      <div class="user-name">
      ${message.user}
      </div>
      <div class="time">
      ${message.time}
      </div>
    </div>
    <div class="message">
      <p class="lower-message__content">
      ${message.content}
      </p>
      ${imageclass}
    </div>
  </div>`

  return html;
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
    $('.contents__messages').append(html)
    $('.contents__messages').animate({ scrollTop: $('.contents__messages')[0].scrollHeight});
    $('.form__submit').removeAttr('disabled');
    $("#message_content").val("");
    $("#message_image").val("");
  })
  .fail(function(){
    alert('メッセージを入力してください');
  })
  })


  var reloadMessages = 
  function () {
    if (window.location.href.match(/\/groups\/\d+\/message/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.contents__message-box:last').data('id');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(messages){
      html2 = buildHTML(messages)
      $('.contents__messages').append(html2)
      $('.contents__messages').animate({ scrollTop: $('.contents__messages')[0].scrollHeight});
    })
  })
    .fail(function() {
      alert('error');
      })
    };
  }
  setInterval(reloadMessages, 5000);
});