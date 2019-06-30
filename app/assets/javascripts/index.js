$(document).on("turbolinks:load", function(){

  var search_result = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="user-search-result__name">
                  ${user.name}
                  <div class="user-search-result__add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_result.append(html);
    return html;
  }

  function NoUser(user){
    var html = `<div class="user-search-result__name">一致するユーザーはいません</div>`
    search_result.append(html);
    return html;
  }

  var addList = $(".chat-group-form__field--right--list")

  function appendUserToMemberList(name, user_id){
    var html = `<div class="user-search-result__name">
                  <input name="group[user_ids][]" type="hidden" value=${user_id}>
                  ${name}
                  <span class="user-search-result__delete js-remove-btn">削除</span>
                </div>`
    addList.append(html);
    return html;
  }

  $(".chat-group-form__field--right__search__input").on("keyup", function(){
    var input = $(".chat-group-form__field--right__search__input").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input},
      dataType: "json"
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (users.length !== 0 && input.length == 0) {
        $("#user-search-result").empty();
      }
      else {
        NoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('error');
    })
  });
  $(function(){
    $(".chat-group-form__field--right").on('click', '.user-search-result__add', function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendUserToMemberList(name, user_id);
    });
  });
  $(function(){
    $(document).on("click",".js-remove-btn", function(){
      $(this).parent().remove();
    });
  });
});

