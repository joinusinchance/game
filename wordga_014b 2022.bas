CLS
! from old code on phone lets rehabilitate for 2022
! max dimensions
! maximum, how many words in a level?
! lets say 32 max


maxwords = 32 
stime = 0

! position in level file

fpos= 1
! how many words in this level 

! level words 

! level words length

! level words order & placement



DIM lword$[32]

DIM lwordlen[32]

DIM lwordsx[32]

DIM lwordsy[32]

DIM lwordd [32,2] 
tlevels = 1
level = 1

! placeholder values
lname$ ="amazing.."
ldescription$ = "description here"
lbeat = 6
lwords = 2

! current word & character

cword = 0
score = 0
totalscore = 0 



gamestate  = 0

! -1 init 
! 0 front screen
! 1 chapter header
! 2 main game
! 3 score table
! 100 end page
! 400 achievements
! 500 guide page 1

DIM cword$[32]


! matrix level index


DIM ab [8,7]
DIM ablev [8,7] 
DIM ablevold [8,7]
DIM abchar$ [8,7]
DIM abcharold$ [8,7]
DIM abcolor[7,3]


GR.OPEN 255, 255, 255, 255

GR.ORIENTATION 1

GR.SCREEN w, h


PRINT w
PRINT h

h2=  h
h = w
w= h2

wt = w / 10
ht = h / 10


PRINT WT
PRINT HT


GR.TEXT.TYPEFACE 2

GOSUB initcolor
GOSUB clearmatrix
GOSUB drawcontrols

GR.RENDER

! gosub initarray
dword = 1

!GOSUB drawmatrix

x=0
y=0
sx= 0
sy=0

sxid = 0
syid = 0

xid =0
yid =0
pxid =0
pyid =0

DX=0
dy=0

GOSUB next_gamestate

GOTO finish


NEXT_gamestate:

DO 

 IF gamestate = 0
  PRINT "front page"
  GOSUB front_page
 ELSE if gamestate = 1
  PRINT "chapter header"
  GOSUB chapter_page
 ELSE if gamestate = 2
  PRINT "now game"
  GOSUB game_page
 ELSE if gamestate = 3
  GOSUB score_page
 ELSE if gamestate = 100
  GOSUB end_page
 ENDIF

UNTIL 1 = 2



RETURN



front_page:

GR.CLS

! title
GR.TEXT.SIZE wt*1.5

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, wt*2.5,ht *3.5, ~
"Worga"

GR.TEXT.SIZE wt*1

! exit 
! GR.TEXT.DRAW  awrd, wt*8,ht *10, ~
! "exit"

GR.RENDER

PRINT "front page",  ison


DO

 GR.TOUCH flag, x , y

 IF flag 

  IF ison = 0
   ison =1
   xid =  floor (x/w*10) 
   yid  = floor (y/h*10)

   gamestate = gamestate +1

  ELSE if ison = 1

  ENDIF

 ELSE if flag =0

  IF ison = 1
   ison =0
   PRINT "flag off"
  ENDIF 

 ENDIF


UNTIL gamestate <> 0

RETURN

chapter_page:

GOSUB initlevel

! add stuff here

GR.CLS

GR.TEXT.SIZE wt*1.5

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 10,ht *3.5, ~
lname$

GR.TEXT.SIZE wt*0.75
GR.TEXT.DRAW  awrd, 10,ht *4, ~
ldescription$ 

GR.RENDER

DO

 GR.TOUCH flag, x , y

 IF flag 

  IF ison = 0
   ison = 1
   xid =  floor (x/w*10) 
   yid  = floor (y/h*10)

   gamestate = gamestate +1

  ELSE if ison = 1

  ENDIF

 ELSE if flag =0

  IF ison = 1
   ison =0
   PRINT "flag off"
  ENDIF 

 ENDIF


UNTIL gamestate <> 1


RETURN 



game_page:

GOSUB initcolor
GOSUB clearmatrix
GOSUB drawcontrols

score = 0
cword = 0
! gosub initarray
dword = 1


PRINT "game page"
DO


 GR.TOUCH flag, x , y

 IF flag 

  xid = floor (x/w*10) 
  yid = floor (y/h*10)

  IF cword > 0
   dx = lwordd[cword,1]
   dy = lwordd[cword,2]
  ENDIF


  ! check if touch is off  
  IF ison =0 THEN 
   ison =1

   PRINT "xid - yid ",  xid, yid
   PRINT stime

   sx = x
   sy = y

   ! test for control section

   IF  yid >= 8
    ison = 2
    GOSUB on_control_touch

   ELSE if  yid <=0

    stime = TIME()
    ison = 2
    PRINT "start time" , stime
    GOSUB on_control_touch


    ! if not on control, gosub matrix
   ELSE 
    GOSUB on_matrix_touch
   ENDIF 

   ! however if we are already holding on to screen
  ELSE if ison >= 1 

   ! don't allow word cycle or trigger
   ! if already touched outside
   IF  (yid >= 8 | yid  <= 0)~
    &  ison = 2
    GOSUB on_control_touch


   ELSE if ABS(pxid - xid) > 0  ~
    | abs (pyid - yid) > 0


    IF syid = yid

     IF abs (xid - sxid ) >= 1
      DX = xid - sxid
      DX = DX / abs (dx)
      dy = 0
     ENDIF

    ELSE if sxid = xid


     IF abs (yid - syid) >= 1
      Dy = yid - syid
      Dy = Dy / abs (dy)
      DX = 0
     ENDIF

    ENDIF

    pyid = yid
    pxid = xid

    IF cword > 0
     lwordd[cword,1] = dx
     lwordd[cword,2] = dy
    ENDIF

    GOSUB drawmatrix

   ENDIF 

  ENDIF 


 ELSE if flag =0


  IF ison >= 1
   ison =0
   stime = 0
   PRINT "flag off"

  ENDIF 
 ENDIF

 ! check for score
 IF score >= lbeat

  gamestate = gamestate +1
  totalscore = totalscore + score
 ENDIF

UNTIL gamestate <> 2

RETURN

score_page:
! add stuff here

GR.CLS

GR.TEXT.SIZE wt*0.5

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 10,ht *3.5, ~
"Score required: " +INT$(lbeat)

GR.TEXT.DRAW  awrd, 10,ht *4, ~
"Score achieved: " + INT$(score)
GR.TEXT.DRAW  awrd, 10,ht *4.5, ~
"Total score so far: " +INT$(totalscore)
GR.TEXT.DRAW  awrd, 10,ht *5, ~
"Next unlock at: " +INT$(9999)


GR.RENDER

DO

 GR.TOUCH flag, x , y

 IF flag 

  IF ison = 0
   ison = 1
   xid =  floor (x/w*10) 
   yid  = floor (y/h*10)

   IF level > tlevels 
    gamestate = 100
   ELSE
    gamestate = 1
   ENDIF
   PRINT "level /tot levels"
   PRINT level ,tlevels

  ELSE if ison = 1

  ENDIF

 ELSE if flag =0

  IF ison = 1
   ison =0
  ENDIF 

 ENDIF


UNTIL gamestate <> 3

RETURN 

END_page:
! add stuff here

GR.CLS

GR.TEXT.SIZE wt

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 10,ht *3.5, ~
"Complete!"
GR.TEXT.SIZE wt *0.5
GR.TEXT.DRAW  awrd, 10,ht *4, ~
"Thanks for playing!"


GR.RENDER

DO

 GR.TOUCH flag, x , y

 IF flag 
  IF ison = 0
   ison = 1
   gamestate = 0
   level = 0
   fpos = 0
  ELSE if ison = 1

  ENDIF 

 ELSE
  ison = 0
 ENDIF 

UNTIL gamestate <>100

RETURN 





initlevel: 
! to-do error checking
thistrick$=""
! fpos
I=1

TEXT.OPEN R, FN2, "levels_01.txt"
PRINT "level " , level
PRINT "------"

PRINT "fpos, i" fpos , i

! read through until we find place in file
IF fpos > i
 DO
  TEXT.READLN FN2, tline$
  PRINT "tline " , tline$
  PRINT i
  I = I +1
 UNTIL I > fpos 
ELSE
 TEXT.READLN FN2, tline$
 tlevels= VAL(tline$)
 I=I +1
ENDIF

fpos = I


PRINT "last line ", tline$
PRINT level


PRINT "caught up"
IF level <= tlevels

 PRINT 
 ! now load up next level

 TEXT.READLN FN2, tline$
 lname$ =tline$
 fpos = fpos +1

 TEXT.READLN FN2, tline$
 ldescription$ = tline$
 fpos = fpos +1

 TEXT.READLN FN2, tline$
 lbeat = VAL(tline$)
 fpos = fpos +1

 TEXT.READLN FN2, tline$
 lwords = VAL(tline$)

 fpos = fpos + lwords

 I = 1

 ! pick up words 
 DO

  TEXT.READLN FN2, tline$
  lword$[i] = tline$

  I = I +1

 UNTIL I > lwords

 level = level +1
ENDIF


cword = 0

RETURN



drawmatrix:

DIM cwordold$[32]

GR.CLS
GOSUB clearmatrix


GR.TEXT.SIZE wt

score =0
dword = 0
cxid = 1 
cyid = 1

cc = 1

IF cword > 0

 DO 

  ! load current word into split array

  dword = dword +1
  GOSUB nextword


  cxid = lwordsx[dword]
  cyid = lwordsy[dword]

  ! make copy of previous array

  ARRAY.COPY abchar$[],abcharold$[]

  GOSUB check_synonym
  GOSUB check_portmaneau


  ! draw each character of current word


  DO

   ! think about otherways

   cwordold$[cc] = cword$[cc]
   IF abchar$ [cxid,cyid] <> cword$[cc] 
    ablev [cxid,cyid] = ablev [cxid,cyid]+1

   ELSE if abchar$ [cxid,cyid] = cword$[cc]
    score = score + 1
   ENDIF

   abchar$ [cxid,cyid] = cword$[cc]


   ! cword$[cc]

   cxid = cxid + lwordd[dword,1]
   cyid = cyid + lwordd[dword,2]

   PRINT "dword dir x dir y"
   PRINT dword, lwordd[dword,1], lwordd[dword,2]

   IF cxid >8
    cxid =1
   ELSE if  cxid < 1
    cxid =8
   ELSE if cyid >7
    cyid = 1
   ELSE if cyid <1
    cyid = 7
   ENDIF


   cc = cc + 1

  UNTIL cc > cwl

  ! check used to be here

 UNTIL dword  = cword
ENDIF

! draw matrix by 2d array

cxid = 1
cyid = 1

GR.COLOR 255, ~ 
0, ~
0, ~
0, 255

GR.LINE n,wt, ht, wt*9, ht

GR.LINE n,wt, ht, wt, ht*8

GR.LINE n,wt*9, ht, wt*9, ht*8



DO
 DO

  GR.COLOR 255, ~ 
  0, ~
  0, ~
  0, 255

  GR.LINE n,wt*cxid, ht , wt* cxid, ht* 8





  CI = ablev [cxid,cyid]

  IF CI >= 8 
   CI = 1
  ENDIF
  IF ci <1
   ci = 1
  ENDIF



  ! gr.rect abox, wt*(cxid),ht *(cyid-1) + ht/3, wt*(cxid+1),ht *(cyid+1)+ ht/3



  GR.COLOR 255, ~ 
  abcolor[ci, 1], ~
  abcolor[ci, 2], ~
  abcolor[ci, 3], 255

  ! if current word dark blue
  IF dword = cword

   GR.COLOR 255, ~ 
   abcolor[ci, 1], ~
   abcolor[ci, 2],  ~
   abcolor[ci, 3] + ABS(254 - abcolor[ci, 3])+1 /2 ~
   , 255


  ENDIF



  GR.TEXT.DRAW  awrd, wt*(cxid)+ wt/5,ht *(cyid+1) - ht/3, ~
  abchar$[cxid,cyid]

  cxid = cxid +1

 UNTIL cxid = 9
 cxid = 1

 cyid = cyid + 1

 GR.COLOR 255, ~ 
 0, ~
 0, ~
 0, 255

 GR.LINE n,wt, ht* cyid, wt*9, ht * cyid


UNTIL cyid =8



GOSUB drawcontrols

GR.RENDER


RETURN 


drawcontrols:
PRINT "draw controls"
GR.TEXT.SIZE wt*0.75

! controls
! undo 
GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 1,ht *0.75, ~
"undo"

! exit 
GR.TEXT.DRAW  awrd, wt*8,ht*0.75, ~
"exit"


! score
GR.TEXT.SIZE wt*0.50

GR.TEXT.DRAW  awrd, wt*1, ht*10, ~
thistrick$

GR.TEXT.DRAW  awrd, wt*8, ht/3, ~
INT$(lbeat) + ":" + ~
INT$(score) + ":" + INT$(totalscore) 

! words yet to use
! remaining words

rwords$= ""

PRINT "cword ", cword, " lwords ", lwords

IF cword + 1<= lwords
 a =  cword + 1 

 delim$ = ", "
 DO
  IF a=lwords
   delim$ = ""
  ENDIF

  rwords$ = rwords$ + lword$[a] + delim$

  a= a+ 1 
 UNTIL a >lwords

 GR.TEXT.DRAW  awrd, 1, ht* 9.25 , ~
 rwords$

 PRINT rwords$

ENDIF 

RETURN

NEXTword:

! load next word into cword for display

cw = dword

cc = 1 
cwl = LEN(lword$[cw])
DO

 cword$[cc] =MID$(lword$[cw],cc,1)
 cc = cc + 1

UNTIL cc > cwl

DO
 cword$[cc] = ""
 cc = cc +1
UNTIL cc > 32

cw = 1
cc = 1


RETURN 




initcolor:

abcolor[1,1] = 0
abcolor[1,2] = 0
abcolor[1,3] = 0

abcolor[2,1] = 125
abcolor[2,2] = 25
abcolor[2,3] = 25

abcolor[3,1] = 255
abcolor[3,2] = 70
abcolor[3,3] = 70

abcolor[4,1] = 75
abcolor[4,2] = 250
abcolor[4,3] = 25

abcolor[5,1] = 100
abcolor[5,2] = 255
abcolor[5,3] = 255

abcolor[6,1] = 125
abcolor[6,2] = 20
abcolor[6,3] = 97

abcolor[7,1] = 150
abcolor[7,2] = 255
abcolor[7,3] = 255

RETURN

clearmatrix:

a = 1
b = 1

aw = 1
bd = 1


DO
 DO
  ab[a,b] =0
  abchar$[a,b] = ""
  ablev[a,b] = 0

  a=a+1
 UNTIL a> 8
 a=1
 b =b +1
UNTIL b > 7


aw= cword +1
bd=1
DO
 DO
  PRINT aw, bd, lwordd[aw,bd]
  lwordd[aw,bd] = 0
  PRINT aw, bd, lwordd[aw,bd]
  bd =bd +1

 UNTIL bd > 2
 bd = 1
 aw = aw +1
UNTIL aw > lwords


RETURN


on_control_touch:

! undo
IF stime > 0
 ctime = time ()
ENDIF


IF xid < 3 & yid <=0 & cword > 0  

 IF ctime > stime + 800
  PRINT stime
  PRINT ctime
  stime = 0
  ctime = 0
  ison = 0


  cword  = cword - 1
  PRINT "undo"

  IF cword <0  
   cword = 0
  ENDIF 

  GOSUB drawmatrix
 ENDIF


ELSE if y / h *10 >= 8.5 & ison =2
 ! scroll through words


 ison = 3

 PRINT "scroll through words.."

 ! cycle remaining word list
 PRINT "current word" ,cword 

 worda$ = lword$[cword +1]
 ac = lwords

 DO
  wordb$ = lword$[ac]
  lword$[ac] = worda$
  worda$ = wordb$
  ac=AC -1
 UNTIL ac = cword 



 GOSUB drawmatrix

ENDIF

! exit game
IF xid >= 8 & yid <=0 

 IF ctime > stime + 800
  PRINT stime
  PRINT ctime
  stime = 0
  ctime = 0
  ison = 1

  gamestate = 0
  totalscore = 0
  score = 0
  level = 1
  fpos = 0

  PRINT "exit" 

  ! goto finish
 ENDIF 
ENDIF

RETURN



on_matrix_touch:

! else limit ranges and do stuff wth matrix

! limit x values 
IF xid >8
 xid = 8
ELSE if xid < 1
 xid = 1
ENDIF

sxid = xid
syid = yid
pxid = xid
pyid = yid

! if x & values within grid, go for it 
IF xid > 0 & xid <9 & ~
 yid > 0 & yid <8
 cword = cword +1
ENDIF


DX = 1
DY = 0

! call draw

IF cword > lwords
 cword = 1
ENDIF 

IF sxid >0 & syid > 0 & ~
 sxid <9  & syid <8

 lwordsx[cword] = sxid
 lwordsy[cword] = syid


 lwordd[cword,1] = dx
 lwordd[cword,2] = dy

ENDIF

GOSUB drawmatrix

RETURN

finish:

GR.CLOSE

END

check_synonym:

a =1

ARRAY.COPY cword$[], cwordcopy$[]

worda$ =""
wordb$ =""


x = lwordsx[dword]  
y = lwordsy[dword] 

dx = lwordd[dword,1] 
dy = lwordd[dword,2] 

PRINT lword$[dword]  
PRINT abcharold$[x,y]
PRINT "rrrrrrr"
PRINT x,y

ARRAY.FILL cwordold$ [32] ,""

a =1
DO
 PRINT abcharold$[x,y] 
 PRINT cwordold$[a]
 cwordold$[a] = abcharold$[x,y]
 PRINT cwordold$[a], a
 x = x +(1 * dx )
 y = y +(1 * dy )


 IF x<1

  x = 8 - x
 ENDIF

 IF x> 8
  x = x -8
 ENDIF

 IF y < 1
  y= 7 - y
 ENDIF

 IF y > 7
  y= y -7
 ENDIF


 a =a+1
UNTIL a>len (lword$[dword])


ARRAY.COPY cwordold$[], stest$[]
ARRAY.SORT cwordcopy$[]
ARRAY.SORT cwordold$[]

PRINT "==="
ARRAY.REVERSE cwordold$[]
ARRAY.REVERSE cwordcopy$[]


a=1
DO

 ! print array.length cwordcopy$
 ! print array.length cwordold$



 worda$= worda$ +cwordcopy$[a]
 wordb$= wordb$ +cwordold$[a]

 PRINT worda$,wordb$, "@#"
 a = a +1
UNTIL a>len (lword$[dword])

PRINT "synonym check"
PRINT worda$
PRINT wordb$

IF worda$ = wordb$ & worda$<>""
 PRINT "it's a synonym"

 thistrick$ = "anagram!"
ELSE
 PRINT "not an anagram"
 thistrick$ = ""
ENDIF

RETURN


check_portmaneau:
! lwordsx []
! lwordsy []

! lwordd
! DIM lword$[32]
! dword

ARRAY.LOAD porword$[], "europe","asia" ~
"lunch","dinner","shoe","heels"
ARRAY.LOAD porlf[],3,1,1,2,2,2

dx = lwordd[dword,1] 
dy = lwordd[dword,2] 

x =0
y =0

! check for either portmanteau 
! word is current 

worda$ =""
wordb$ =""
wordcheck$ =""
abword$ = ""
abchar$ = ""

PRINT "start p check"
a =1
DO

 worda$ =""
 wordb$ =""
 wordcheck$ =""
 abword$ = ""
 abchar$ = ""

 ! thistrick$ =""
 ! thistrick$= int$(x) +","+int$(y)

 IF lword$[dword] = porword$[a]
  IF mod (a,2) = 1
   worda$= porword$[a]
   wordb$ = porword$[a+1]
   wordcheck$ = MID$(wordb$, porlf[a+1],100)

   por = 2

   x = lwordsx[dword] + ((porlf[a]-1) * dx ) 
   y = lwordsy[dword] + ((porlf[a]-1) * dy )


   PRINT worda$ , "aaaa"
   PRINT wordb$ , "bbbb"

   PRINT "por2 asia" , wordcheck$
   PRINT x,y
   GOSUB traverse_portmanteau

  ELSE
   worda$ = porword$[a-1]
   wordb$= porword$[a]
   wordcheck$ = MID$(worda$,1,porlf[a-1])
   por =1

   x = lwordsx[dword] + ((porlf[a]-1) * dx) 
   y = lwordsy[dword] + ((porlf[a]-1) * dy)

   PRINT worda$ , "aaaa"
   PRINT wordb$ , "bbbb"
   PRINT "por1 europe" ,wordcheck$
   PRINT x,y
   PRINT ((porlf[a]-1) * dx*-1)
   PRINT ((porlf[a]-1) * dy*-1)
   GOSUB traverse_portmanteau

  ENDIF
 ENDIF
 a =a+1
UNTIL a>6
! extend later

! check if 



RETURN


traverse_portmanteau:

c = 1

DO
 IF por =1

  x = x +(1 * dx *-1)
  y = y +(1 * dy *-1)

 ELSE


  x = x +(1 * dx )
  y = y +(1 * dy )

 ENDIF 


 IF x<1
  x = 8 - x
 ENDIF

 IF x> 8
  x = x -8
 ENDIF

 IF y < 1
  y= 7 - y
 ENDIF

 IF y > 7
  y= y -7
 ENDIF

 PRINT dx, dy,"……>"
 PRINT x,y ,abcharold$[x,y]

 IF por =1
  abchar$=abcharold$[x,y] +abchar$

 ELSE
  abchar$=abchar$ +abcharold$[x,y] 
 ENDIF

 c=c+1

UNTIL c > LEN(wordcheck$)


PRINT "@@@"
PRINT worda$, wordb$
PRINT wordcheck$
PRINT abchar$
PRINT x,y
PRINT "@@@@@"

IF wordcheck$= abchar$ & ~
 abchar$<>""
 thistrick$ = thistrick$+ "portmanteau"
 ! consider re evaluate in score
 score = score + LEN(worda$)+ LEN(wordb$)

 PRINT "portmanteau"
ELSE
 thistrick$ = thistrick$+""
 PRINT "not port"
ENDIF

IF abchar$= ""

 PRINT "empty issue"
ENDIF

RETURN
