console.log("connpassの取得");

// api用URLの生成
// クロスオリジン対策でcallbackを付与しておく
var url = "https://connpass.com/api/v1/event/?callback=?";
// 検索ワード
url += "&keyword=福岡";
// イベント開催日年月
url += "&ym=";
// 当月から来月分のデータを取得する
url += "201704,201705";
// 表示順（2：開催日順）
url += "&order=2";
// 取得件数
url += "&count=20";

// スタイル６までしかないので対応するやつに変換する
function createStyle(i) {
    var num = 0;
    var aa = Math.floor(i / 6);
    num = parseInt(i) - parseInt(6 * parseInt(aa)) + 1;
    return "style" + num;
}
// １〜１２
function createImage(i) {
    var num = 0;
    var aa = Math.floor(i / 6);
    num = parseInt(i) - parseInt(6 * parseInt(aa)) + 1;

    if(num < 10) {
        num = "0" + num;
    }

    return "images/pic" + num + ".jpg";
}

// 全部入らないから20文字くらいで区切る
function createDescription( text ) {
    return text.slice(0, 40) + "...";
}

// 取得した日付を表示用に整形する
function adjustDate(eventDate) {
    var date = new Date(eventDate);
    var month = date.getMonth()+1;
    var day = date.getDate();
    return "【" + month + "/" + day + "】";
}

// ajax通信でデータを取得し、要素を生成する
$.ajax({
    url       : url,
    type      : 'GET',
    dataType  : 'json',
    success   : function(json) {
                    
                    var events = json.events;

                    for( var k in events ) {

                        $('.tiles').append(
                            '<article class="'+ createStyle(k) +'"><span class="image">'
                            + '<img src="' + createImage(k) + '" alt="" />'
                            + '</span><a href="' + events[k]["event_url"] + '">'
                            + '<h2>' + adjustDate(events[k]["started_at"]) + events[k]["title"] + '</h2>'
                                    + '<div class="content">'
                                        + '<p>' + createDescription(events[k]["description"]) + '</p>'
                                    + '</div>'
                                + '</a>'
                            + '</article>');
                    }
                }
});