;ティラノスクリプトサンプルゲーム

*start

[cm  ]
[clearfix]
[start_keyconfig]


[bg storage="room.jpg" time="100"]

;メニューボタンの表示
@showmenubutton

;メッセージウィンドウの設定
[position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]

;文字が表示される領域を調整
[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]


;メッセージウィンドウの表示
@layopt layer=message0 visible=true

;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]

;このゲームで登場するキャラクターを宣言
;akane
[chara_new  name="akane" storage="chara/akane/normal.png" jname="あかね"  ]
;キャラクターの表情登録
[chara_face name="akane" face="angry" storage="chara/akane/angry.png"]
[chara_face name="akane" face="doki" storage="chara/akane/doki.png"]
[chara_face name="akane" face="happy" storage="chara/akane/happy.png"]
[chara_face name="akane" face="sad" storage="chara/akane/sad.png"]


;yamato
;[chara_new  name="yamato"  storage="chara/yamato/normal.png" jname="やまと" ]

@jump target="*button3_V"

#
さて、ゲームができるというから、来てみたものの[p]

誰もいねぇじゃねぇか。[p]
……[p]
帰るか。。。[p]

@quake count=4 vmax=120 time=600 wait="false"
[dekamoji]
#?
ちょっとまったーーーーー[p]
[resetfont]

#
誰だ！？[p]

;キャラクター登場
[chara_show  name="akane"  ]
#?
こんにちは。[p]
私の名前はあかね。[p]
#あかね:angry
ゲームだったら用意してあるわ[p]

[dekamoji]勝負よ！[resetfont][p]

#
……………[p]
なんでだよっ！[p]

#あかね:default
全然わからない…[p]
わたしは…[r]
;@playse storage="jajaan.mp3"
#あかね:angry
[dekamoji]雰囲気で勝負している！[resetfont][p]

#
そうか…[r]
勝負の理由なんか【雰囲気】でいいのか…[p]

#あかね:happy
[dekamoji]Exactly.[resetfont][r]
（まさにそのとおりです！）[p]

じゃあ、ルール説明[p]
【わたしが仕掛けたボタン】を押せたらあなたの勝ち[r]
いいわね？[p]

@chara_move name="akane" left="+=100"
[iscript]
dispbutton1("絶対押すな！");
[endscript]
@layopt layer="1" visible = "true"
どう？押せるかしら？[r]
（音が突然出るからびっくりしないでね！）
[iscript]
seteventbutton1("*button1_V");
[endscript]
[s]

*button1_V
@layopt layer="1" visible = "false"
@chara_move name="akane" left="-=100"
#あかね:doki
[cm]
うそっ…[r]
なんで押せちゃうの…[p]

#あかね:sad
徹夜して仕掛けておいたのに…[p]

#
[dekamoji]もっと心を込めて書くんだな[resetfont][p]

@call storage="first.ks" target="*stageend"
@call storage="first.ks" target="*nextday"

#あかね
わたしは質問に答えたりしない…[r]
それが基本…[p]

@chara_move name="akane" left="+=100"
[iscript]
dispbutton1("♡押さないでね♡");
[endscript]
@layopt layer="1" visible = "true"
さあ、これでどう？[r]
（音が突然出るからびっくりしないでね！）
[iscript]
seteventbutton1("*button2_V");
[endscript]
[s]

*button2_V
@layopt layer="1" visible = "false"
@chara_move name="akane" left="-=100"
#あかね:doki
[cm]
ええええええ[r]
なんで？なんで？[p]

#あかね:sad
一晩中かけて…心をこめて…[r]
chatGPTにも校正してもらったのに…[p]

#
[dekamoji]AIには人の温かみが理解できないのさ[resetfont][p]

@call storage="first.ks" target="*stageend"
@call storage="first.ks" target="*nextday"

#あかね:happy
今度こそ負けないからね…[r]
フフフ…[p]

@chara_move name="akane" left="+=100"
[iscript]
dispbutton1("108歳未満お断り");
[endscript]
@layopt layer="1" visible = "true"
どう？押せないでしょ！[r]
（音が突然出るからびっくりしないでね！）
[iscript]
seteventbutton1("*button3_V");
[endscript]
[s]

*button3_V
@layopt layer="1" visible = "false"
@chara_move name="akane" left="-=100"
#あかね:doki
[cm]
そ、そんなはずは…[p]

#あかね:sad
【年齢制限】さえ突破してくるなんて…[p]

#
人には108個あるという…[p]
[dekamoji]煩悩の前には無敵なのだ！[resetfont][p]
…もうひとひねりだなｗｗｗ[p]

@call storage="first.ks" target="*stageend"
@call storage="first.ks" target="*nextday"

#あかね:happy
今度こそ負けないからね…[r]
フフフ…[p]

@chara_move name="akane" left="+=100"
[iscript]
dispbutton1("絶対押すな！");
const element = document.querySelector('.caution-button');
// CSSで定義したクラスを追加
element.classList.add('twist-button');
[endscript]
@layopt layer="1" visible = "true"
どう？ちゃんとひねってきたわ！[r]
（音が突然出るからびっくりしないでね！）
[iscript]
seteventbutton1("*button3_V");
[endscript]
[s]


[s]
