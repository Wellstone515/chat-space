$(function(){
  function buildHTML(message){
    var html = `<div class="chat-main__messages__message">
                  <div class="chat-main__messages__message__upper-info">
                    <div class="chat-main__messages__message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="chat-main__messages__message__upper-info__date">
                      ${message.date}
                    </div>
                    <div class="chat-main__messages__message__text">
                      ${message.body}
                    </div>
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
    })
  })
});

