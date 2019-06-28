$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    if (message.image.url !== null) {
      var image = `<p><img src="${message.image.url}"></p>`
    } else {
      var image = ``
    }
    var getTime = new Date();
    var year = getTime.getFullYear();
    var month = getTime.getMonth()+1;
    var date = getTime.getDate();
    var hour = getTime.getHours();
    var minutes = getTime.getMinutes();
    var current_time = `<p>${year}/${month}/${date} ${hour}:${minutes}</p>`
    var html = `<div class="chat-main__messages__message">
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
      $(".chat-main__form__new-message__input-box__text").val("")
      $(".chat-main__form__new-message__input-box__image__file").val("")
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
      $(".chat-main__form__new-message__submit-btn").attr("disabled", false);
    })
    .fail(function(){
      alert("メッセージを入力してください");
      $(".chat-main__form__new-message__submit-btn").attr("disabled", false);
    });
  });
});

