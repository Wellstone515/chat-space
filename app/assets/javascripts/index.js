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







// $(function() {

//   var search_list = $("#user-search-result");
//   var member_list = $(".user-search-result__name");

//   function appendUserToSearchList(user) {
//     var html =
//       `<div class="chat-group-user clearfix">
//           <p class="chat-group-user__name">${ user.name }</p>
//           <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
//       </div>`
// 　　 search_list.append(html);
// 　　 return html;
//    }

//   function appendUserToMemberList(name, user_id) {
//     var html =
//       `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
//         <input name='group[user_ids][]' type='hidden' value=${ user_id }>
//         <p class='chat-group-user__name'>${ name }</p>
//         <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
//       </div>`
// 　　 member_list.append(html);
//   }

//   function appendNoUserToSearchList(user) {
//     var html =
//       `<div class="chat-group-user clearfix">
//         <p class="chat-group-user__name">${ user }</p>
//       </div>`
//     search_list.append(html);
//   }

//   $(function(){
//     $("#user-search-field").on("keyup", function() {
//       var input = $("#user-search-field").val();

//       $.ajax({
//         type: 'GET',
//         url: '/users',
//         data: { keyword: input },
//         dataType: 'json'
//       })

//       .done(function(users) {
//         $("#user-search-result").empty();
//           if (users.length !== 0) {
//             users.forEach(function(user){
//             appendUserToSearchList(user);
//             });
//           }
//           else {
//             appendNoUserToSearchList("一致するユーザーはいません");
//           }
//         })
//       .fail(function() {
//         alert('ユーザー検索に失敗しました');
//       })
//     });

    // $(function(){
    //   $(document).on('click', '.user-search-add', function() {
    //     var name = $(this).attr("data-user-name");
    //     var user_id = $(this).attr("data-user-id");
    //     $(this).parent().remove();
    //     appendUserToMemberList(name, user_id);
    //   });

// 　    $(document).on("click", '.user-search-remove', function() {
//         $(this).parent().remove();
//       });
//     });
//   });
// });