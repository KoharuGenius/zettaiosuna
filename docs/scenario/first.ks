;一番最初に呼び出されるファイル

[title name="ティラノスクリプト解説"]

[stop_keyconfig]


;ティラノスクリプトが標準で用意している便利なライブラリ群
;コンフィグ、CG、回想モードを使う場合は必須
@call storage="tyrano.ks"

;ゲームで必ず必要な初期化処理はこのファイルに記述するのがオススメ
[loadjs storage="dispbutton.js"]
[loadcss file="./data/others/gamebutton.css"]

[macro name="dekamoji"]
[font size="40" bold="true"]
[endmacro]

[macro name="moveright"]
;
[endmacro]

[macro name="dispbutton"]

[endmacro]

;メッセージボックスは非表示
@layopt layer="message" visible=false

;最初は右下のメニューボタンを非表示にする
[hidemenubutton]

;タイトル画面へ移動
@jump storage="title.ks"

[s]

*stageend
#あかね:doki
そ…そうか！[p]
#あかね:angry
[dekamoji]おぼえてなさいよーっ[resetfont][p]
#
[cm]
@chara_hide name="akane"
[return]



*nextday
@mask
@wait time=500
@mask_off

#
（次の日）[p]

@chara_show name="akane" face="angry"
#あかね
[dekamoji]勝負よっ！[resetfont][p]

#
なんでだよっ！[p]
[return]



