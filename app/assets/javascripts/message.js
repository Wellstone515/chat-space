$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var image = ( message.image.url ) ? `<p><img src="${message.image.url}"></p>` : "";
    var getTime = new Date();
    var year = getTime.getFullYear();
    var month = getTime.getMonth()+1;
    var date = getTime.getDate();
    var hour = getTime.getHours();
    var minutes = getTime.getMinutes();
    var current_time = `<p>${year}/${month}/${date} ${hour}:${minutes}</p>`
    var html = `<div class="chat-main__messages__message" data-message-id="${message.id}" data-message-name="${message.name}">
                  <div class="chat-main__messages__message__upper-info">
                    <div class="chat-main__messages__message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="chat-main__messages__message__upper-info__date">
                      ${current_time}
                    </div>
                    <div class="chat-main__messages__message__text">
                      ${message.body}
                    </div class="chat-main__messages__message__image">
                      ${image}
                  </div>
                </div>`
    return html;
  }


  setInterval(function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-main__messages__message:last').data("message-id");
      var last_message_name = $('.chat-main__messages__message:last').data("message-name");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id},
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.chat-main__messages').append(insertHTML);
        })
        if (last_message_name !== undefined){
          $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      })
    }
  }, 5000);



  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__messages").append(html)
      $("#new_message")[0].reset();
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
      $(".chat-main__form__new-message__submit-btn").attr("disabled", false);
    })
    .fail(function(){
      alert("メッセージを入力してください");
      $(".chat-main__form__new-message__submit-btn").attr("disabled", false);
    })
  });
});

