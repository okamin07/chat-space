$(function() {
function buildHTML(message){
  var imageclass  = 
  message.image == null ? `` : `<img class="lower-message__image" src="${message.image}"></img>`
  var html = 
  `<div class="contents__message-box">
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
  $(".new_message").on('submit', function(e) {
    console.log("送信ボタンが押されました");
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
  });
});
