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


var endPoint = "http://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search";
var keyword  = "?q=" + "ゲーム";
var keyword2 = "?q=";
// var endPoint = "http://api.search.nicovideo.jp/api/v2/snapshot/video/contents/search?callback=?";
// var keyword  = "&q=" + "ゲーム";
// var keyword2 = "&q=";

var targets  = "&targets=title,description,tags";
var targets2 = "&targets=tags";
var fields   = "&fields=tags";
var fields2  = "&fields=contentId,title,description";
var filters1 = "&filters[categoryTags][0]=ゲーム";
var filters2 = "&filters[startTime][gte]=2017-02-17";
var filters3 = "&filters[startTime][gte]=2017-03-01";
var sort     = "&_sort=-viewCounter";
var offset   = "&_offset=0";
var limit    = "&_limit=10";
var limit2   = "&_limit=";
var context  = "&_context=apiguide";

var apiUrl = endPoint + keyword + targets + fields + filters1 + filters2 + sort + offset + limit + context;

var tagData = [];
var tagList = {};
var tagRank = [];

console.log("大丈夫2");

$.ajax({
    url       : apiUrl,
    type      : 'GET',
    dataType  : 'json',
    success   : function(json) {

        console.log("大丈夫3");

        // 取得したデータに「/」が入ってたらエラーになる？
        var jsonData = json.data;

        // 取得データは１０件固定なので１０回ループを回す
        for( var i in jsonData ) {
            var tags = jsonData[i].tags.split(" ");
            Array.prototype.push.apply(tagData, tags);
        }

        for( var i in tagData ) {
            if( tagData[i] in tagList ) {
                tagList[tagData[i]]++;
            } else {
                tagList[tagData[i]] = 1;
            }
        }

        var j = 1;
        for( var i in tagList ) {
            var tagRankTmp = {};
            tagRankTmp["key"] = i;
            tagRankTmp["val"] = tagList[i];
            tagRank.push(tagRankTmp);
            // Array.prototype.push.apply(tagRank, tagRankTmp);
            j++;
        }

        tagRank.sort( function( a, b ) {
            var aa = a["val"];
            var bb = b["val"];
            if( aa < bb ) { return 1; }
            if( aa > bb ) { return -1; }
            return 0;
        });

        var resData = [];
        var getData = [];

        for( var i = 0; i < 5; i++ ) {

            var apiUrl2 = endPoint + keyword2 + tagRank[i]["key"] + targets2 + fields2 + filters1 + filters3 + sort + offset + limit2 + 5 + context;

            $.ajax({
                url       : apiUrl2,
                type      : 'GET',
                dataType  : 'json',
                async     : false,
                success   : function(json2) {
                    var res = json2.data;
                    Array.prototype.push.apply(getData, res);
                }
            });
        }

        var arrObj = {};

        for(var i = 0; i < getData.length; i++) {
            arrObj[getData[i]["contentId"]] = getData[i];
        }

        for(var key in arrObj) {
            resData.push(arrObj[key]);
        }

        for( var k in resData ) {

            $('.tiles').append(
                  '<article class="'+ createStyle(k) +'">'
                    + '<span class="image">'
                        + '<img src="http://tn-skr3.smilevideo.jp/smile?i=' + createId(resData[k]["contentId"]) + '" alt="" />'
                    + '</span>'
                    + '<a href="http://nico.ms/' + resData[k]["contentId"] + '">'
                        + '<h2>' + resData[k]["title"] + '</h2>'
                        + '<div class="content">'
                            + '<p>' + createDescription(resData[k]["description"]) + '</p>'
                        + '</div>'
                    + '</a>'
                + '</article>');
        }
    }
});