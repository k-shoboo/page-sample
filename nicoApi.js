
console.log("リンクスタート");

// 画像取得用にIDから「sm」を削除する
function createId( contentId ) {
    return contentId.replace(/sm/, "");
}

// スタイル６までしかないので対応するやつに変換する
function createStyle(i) {
    var num = 0;
    var aa = Math.floor(i / 6);
    num = parseInt(i) - parseInt(6 * parseInt(aa)) + 1;
    return "style" + num;
}

// 全部入らないから20文字くらいで区切る
function createDescription( text ) {
    return text.slice(0, 40) + "...";
}

var nicoUrl = "https://script.google.com/macros/s/AKfycbxQAR7Dr0EH3DKoBSvOgoszqe7nHyqHx2D-knkBi36pEgX-xcPm/exec";

$.ajax({
    url       : nicoUrl,
    type      : 'GET',
    dataType  : 'json',
    success   : function(json) {
                    console.log(json);
                    var resData = json.data;
                    for( var k in resData ) {
                        //$('ul').append('<li><a href="http://nico.ms/' + resData[k][l]["contentId"] + '" target="_blank">' + resData[k][l]["title"] + '</a></li>');

                        $('.tiles').append(
                            '<article class="'+ createStyle(k) +'"><span class="image">'
                            //+ '<img src="http://tn-skr3.smilevideo.jp/smile?i=21520922" alt="" />'
                            + '<img src="http://tn-skr3.smilevideo.jp/smile?i=' + createId(resData[k]["contentId"]) + '" alt="" />'
                            + '</span><a href="http://nico.ms/' + resData[k]["contentId"] + '">'
                            + '<h2>' + resData[k]["title"] + '</h2>'
                                    + '<div class="content">'
                                        + '<p>' + createDescription(resData[k]["description"]) + '</p>'
                                    + '</div>'
                                + '</a>'
                            + '</article>');
                    }
                }
});
