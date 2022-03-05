CLS

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


wt = w / 10
ht = h / 10


PRINT WT
PRINT HT


GR.TEXT.TYPEFACE 2

GOSUB initcolor
GOSUB clearmatrix
GOSUB drawcontrols

gr.render

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

gosub next_gamestate

goto finish


next_gamestate:

do 

if gamestate = 0
print "front page"
gosub front_page
else if gamestate = 1
print "chapter header"
gosub chapter_page
else if gamestate = 2
print "now game"
gosub game_page
else if gamestate = 3
gosub score_page
else if gamestate = 100
gosub end_page
end if

until 1 = 2



return



front_page:

gr.cls

! title
GR.TEXT.SIZE wt*1.5

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, wt*2.5,ht *3.5, ~
 "Worga"

GR.TEXT.SIZE wt*1

! exit 
! GR.TEXT.DRAW  awrd, wt*8,ht *10, ~
! "exit"

gr.render

print "front page",  ison



do

GR.TOUCH flag, x , y

IF flag 

if ison = 0
ison =1
xid =  floor (x/w*10) 
yid  = floor (y/h*10)

gamestate = gamestate +1

else if ison = 1

end if

else if flag =0

if ison = 1
ison =0
print "flag off"
end if 

end if


until gamestate <> 0

return

chapter_page:

gosub initlevel

! add stuff here

gr.cls

GR.TEXT.SIZE wt*1.5

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 10,ht *3.5, ~
 lname$

GR.TEXT.SIZE wt*0.75
GR.TEXT.DRAW  awrd, 10,ht *4, ~
 ldescription$ 

gr.render

do

GR.TOUCH flag, x , y

IF flag 

if ison = 0
ison = 1
xid =  floor (x/w*10) 
yid  = floor (y/h*10)

gamestate = gamestate +1

else if ison = 1

end if

else if flag =0

if ison = 1
ison =0
print "flag off"
end if 

end if


until gamestate <> 1


return 



game_page:

GOSUB initcolor
GOSUB clearmatrix
GOSUB drawcontrols

score = 0
cword = 0
! gosub initarray
dword = 1


print "game page"
do


GR.TOUCH flag, x , y

IF flag 

xid = floor (x/w*10) 
yid = floor (y/h*10)

if cword > 0
dx = lwordd[cword,1]
dy = lwordd[cword,2]
end if


! check if touch is off  
if ison =0 then 
ison =1

print "xid - yid ",  xid, yid
print stime

sx = x
sy = y

! test for control section

if  yid >= 8
ison = 2
gosub on_control_touch

else if  yid <=0

stime = time()
ison = 2
print "start time" , stime
gosub on_control_touch


! if not on control, gosub matrix
else 
gosub on_matrix_touch
end if 

! however if we are already holding on to screen
else if ison >= 1 

! don't allow word cycle or trigger
! if already touched outside
if  (yid >= 8 | yid  <= 0)~
 &  ison = 2
gosub on_control_touch


else if abs(pxid - xid) > 0  ~
| abs (pyid - yid) > 0


if syid = yid

if abs (xid - sxid ) >= 1
DX = xid - sxid
DX = DX / abs (dx)
dy = 0
endif

else if sxid = xid


if abs (yid - syid) >= 1
Dy = yid - syid
Dy = Dy / abs (dy)
DX = 0
endif

end if

pyid = yid
pxid = xid

if cword > 0
lwordd[cword,1] = dx
lwordd[cword,2] = dy
end if

gosub drawmatrix

end if 

end if 


else if flag =0


if ison >= 1
ison =0
stime = 0
print "flag off"

end if 
end if

! check for score
if score >= lbeat

gamestate = gamestate +1
totalscore = totalscore + score
end if

until gamestate <> 2

return

score_page:
! add stuff here

gr.cls

GR.TEXT.SIZE wt*0.5

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 10,ht *3.5, ~
 "Score required: " +int$(lbeat)

GR.TEXT.DRAW  awrd, 10,ht *4, ~
 "Score achieved: " + int$(score)
GR.TEXT.DRAW  awrd, 10,ht *4.5, ~
 "Total score so far: " +int$(totalscore)
GR.TEXT.DRAW  awrd, 10,ht *5, ~
 "Next unlock at: " +int$(9999)


gr.render

do

GR.TOUCH flag, x , y

IF flag 

if ison = 0
ison = 1
xid =  floor (x/w*10) 
yid  = floor (y/h*10)

if level > tlevels 
gamestate = 100
else
gamestate = 1
end if
print "level /tot levels"
print level ,tlevels

else if ison = 1

end if

else if flag =0

if ison = 1
ison =0
end if 

end if


until gamestate <> 3

return 

end_page:
! add stuff here

gr.cls

GR.TEXT.SIZE wt

GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 10,ht *3.5, ~
 "Complete!"
GR.TEXT.SIZE wt *0.5
GR.TEXT.DRAW  awrd, 10,ht *4, ~
 "Thanks for playing!"


gr.render

do

GR.TOUCH flag, x , y

IF flag 
if ison = 0
ison = 1
gamestate = 0
level = 0
fpos = 0
else if ison = 1

end if 

else
ison = 0
end if 

until gamestate <>100

return 


initlevel: 
! to-do error checking
thistrick$=""
! fpos
I=1

TEXT.OPEN R, FN2, "levels_01.txt"
print "level " , level
print "------"

print "fpos, i" fpos , i

! read through until we find place in file
if fpos > i
do
TEXT.READLN FN2, tline$
print "tline " , tline$
print i
I = I +1
until I > fpos 
else
TEXT.READLN FN2, tline$
tlevels= Val(tline$)
I=I +1
end if

fpos = I


print "last line ", tline$
print level


print "caught up"
if level <= tlevels

print 
! now load up next level

TEXT.READLN FN2, tline$
lname$ =tline$
fpos = fpos +1

TEXT.READLN FN2, tline$
ldescription$ = tline$
fpos = fpos +1

TEXT.READLN FN2, tline$
lbeat = val(tline$)
fpos = fpos +1

TEXT.READLN FN2, tline$
lwords = val(tline$)

fpos = fpos + lwords

I = 1

! pick up words 
do

TEXT.READLN FN2, tline$
lword$[i] = tline$

I = I +1

until I > lwords

level = level +1
end if


cword = 0

return



drawmatrix:

dim cwordold$[32]

gr.cls
gosub clearmatrix

tbar = ht * 1.5


GR.TEXT.SIZE wt

score =0
dword = 0
cxid = 1 
cyid = 1

cc = 1

if cword > 0

do 

! load current word into split array

dword = dword +1
gosub nextword


cxid = lwordsx[dword]
cyid = lwordsy[dword]

! make copy of previous array

array.copy abchar$[],abcharold$[]

gosub check_synonym
gosub check_portmaneau


! draw each character of current word


do

! think about otherways

cwordold$[cc] = cword$[cc]
if abchar$ [cxid,cyid] <> cword$[cc] 
ablev [cxid,cyid] = ablev [cxid,cyid]+1

else if abchar$ [cxid,cyid] = cword$[cc]
score = score + 1
end if

abchar$ [cxid,cyid] = cword$[cc]


! cword$[cc]

cxid = cxid + lwordd[dword,1]
cyid = cyid + lwordd[dword,2]

print ”dword dir x dir y”
print dword, lwordd[dword,1], lwordd[dword,2]

if cxid >8
cxid =1
else if  cxid < 1
cxid =8
else if cyid >7
cyid = 1
else if cyid <1
cyid = 7
end if


cc = cc + 1

until cc > cwl

! check used to be here

until dword  = cword
end if

! draw matrix by 2d array

cxid = 1
cyid = 1

GR.COLOR 255, ~ 
0, ~
0, ~
0, 255

GR.LINE n,wt, tbar, wt*9, tbar

GR.LINE n,wt, tbar, wt, tbar +ht*8

GR.LINE n,wt*9, tbar, wt*9, tbar + ht*8



do
do

GR.COLOR 255, ~ 
0, ~
0, ~
0, 255

GR.LINE n,wt*cxid, ht , wt* cxid, ht* 8





CI = ablev [cxid,cyid]

if CI >= 8 
CI = 1
end if
if ci <1
ci = 1
end if



! gr.rect abox, wt*(cxid),ht *(cyid-1) + ht/3, wt*(cxid+1),ht *(cyid+1)+ ht/3



GR.COLOR 255, ~ 
abcolor[ci, 1], ~
abcolor[ci, 2], ~
abcolor[ci, 3], 255

! if current word dark blue
if dword = cword

GR.COLOR 255, ~ 
abcolor[ci, 1], ~
abcolor[ci, 2],  ~
abcolor[ci, 3] + abs(254 - abcolor[ci, 3])+1 /2 ~
, 255


end if



GR.TEXT.DRAW  awrd, wt*(cxid)+ wt/5,ht *(cyid+1) - ht/3, ~
abchar$[cxid,cyid]

cxid = cxid +1

until cxid = 9
cxid = 1

cyid = cyid + 1

GR.COLOR 255, ~ 
0, ~
0, ~
0, 255

GR.LINE n,wt, tbar +ht* cyid, wt*9, tbar+ ht * cyid


until cyid =8

gosub drawcontrols

GR.RENDER


return 


drawcontrols:
print "draw controls"
GR.TEXT.SIZE wt*0.75

! controls
! undo 
GR.COLOR 255,0,0,0,255
GR.TEXT.DRAW  awrd, 1,ht *0.75, ~
 "undo"

! exit 
GR.TEXT.DRAW  awrd, wt*8,ht*0.75, ~
 "exit"


! score
GR.TEXT.SIZE wt*0.50

GR.TEXT.DRAW  awrd, wt*1, ht*10, ~
thistrick$

GR.TEXT.DRAW  awrd, wt*8, ht/3, ~
int$(lbeat) + ":" + ~
int$(score) + ":" + int$(totalscore) 

! words yet to use
! remaining words

rwords$= ""

print "cword ", cword, " lwords ", lwords

if cword + 1<= lwords
a =  cword + 1 

delim$ = ", "
do
if a=lwords
delim$ = ""
endif

rwords$ = rwords$ + lword$[a] + delim$

a= a+ 1 
until a >lwords

GR.TEXT.DRAW  awrd, 1, ht* 9.25 , ~
rwords$

print rwords$

end if 

return

nextword:

! load next word into cword for display

cw = dword

cc = 1 
cwl = len(lword$[cw])
do

cword$[cc] =mid$(lword$[cw],cc,1)
cc = cc + 1

until cc > cwl

do
cword$[cc] = ""
cc = cc +1
until cc > 32

cw = 1
cc = 1


return 




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

return

clearmatrix:

a = 1
b = 1

aw = 1
bd = 1


do
do
ab[a,b] =0
abchar$[a,b] = ""
ablev[a,b] = 0

a=a+1
until a> 8
a=1
b =b +1
until b > 7


aw= cword +1
bd=1
do
do
print aw, bd, lwordd[aw,bd]
lwordd[aw,bd] = 0
print aw, bd, lwordd[aw,bd]
bd =bd +1

until bd > 2
bd = 1
aw = aw +1
until aw > lwords


return


on_control_touch:

! undo
If stime > 0
ctime = time ()
end if


if xid < 3 & yid <=0 & cword > 0  

If ctime > stime + 800
print stime
print ctime
stime = 0
ctime = 0
ison = 0


cword  = cword - 1
print "undo"

if cword <0  
cword = 0
end if 

gosub drawmatrix
end if


else if y / h *10 >= 8.5 & ison =2
! scroll through words


ison = 3

print "scroll through words.."

! cycle remaining word list
print "current word" ,cword 

worda$ = lword$[cword +1]
ac = lwords

do
wordb$ = lword$[ac]
lword$[ac] = worda$
worda$ = wordb$
ac=AC -1
until ac = cword 



gosub drawmatrix

end if

! exit game
if xid >= 8 & yid <=0 

If ctime > stime + 800
print stime
print ctime
stime = 0
ctime = 0
ison = 1

gamestate = 0
totalscore = 0
score = 0
level = 1
fpos = 0

print "exit" 

! goto finish
end if 
end if

return



on_matrix_touch:

! else limit ranges and do stuff wth matrix

! limit x values 
if xid >8
xid = 8
else if xid < 1
xid = 1
endif

sxid = xid
syid = yid
pxid = xid
pyid = yid

! if x & values within grid, go for it 
if xid > 0 & xid <9 & ~
yid > 0 & yid <8
cword = cword +1
end if


DX = 1
DY = 0

! call draw

if cword > lwords
cword = 1
endif 

if sxid >0 & syid > 0 & ~
sxid <9  & syid <8

lwordsx[cword] = sxid
lwordsy[cword] = syid


lwordd[cword,1] = dx
lwordd[cword,2] = dy

endif

gosub drawmatrix

return

finish:

GR.CLOSE

END

check_synonym:

a =1

array.copy cword$[], cwordcopy$[]

worda$ =""
wordb$ =""


x = lwordsx[dword]  
y = lwordsy[dword] 

dx = lwordd[dword,1] 
dy = lwordd[dword,2] 

print lword$[dword]  
print abcharold$[x,y]
print "rrrrrrr"
print x,y

array.fill cwordold$ [32] ,""

a =1
do
print abcharold$[x,y] 
print cwordold$[a]
cwordold$[a] = abcharold$[x,y]
print cwordold$[a], a
x = x +(1 * dx )
y = y +(1 * dy )


if x<1

x = 8 - x
end if

if x> 8
x = x -8
end if

if y < 1
y= 7 - y
end if

if y > 7
y= y -7
end if


a =a+1
until a>len (lword$[dword])


array.copy cwordold$[], stest$[]
array.sort cwordcopy$[]
array.sort cwordold$[]

print "==="
array.reverse cwordold$[]
array.reverse cwordcopy$[]


a=1
do

! print array.length cwordcopy$
! print array.length cwordold$



worda$= worda$ +cwordcopy$[a]
wordb$= wordb$ +cwordold$[a]

print worda$,wordb$, "@#"
a = a +1
until a>len (lword$[dword])

print “synonym check“
print worda$
print wordb$

if worda$ = wordb$ & worda$<>““
print "it's a synonym"

thistrick$ = "synonym!"
else
print "not a synonym"
thistrick$ = ""
end if

return


check_portmaneau:
! lwordsx []
! lwordsy []

! lwordd
! DIM lword$[32]
! dword

array.load porword$[], "europe","asia" ~
”lunch”,”dinner”,"shoe","heels"
array.load porlf[],3,1,1,2,2,2

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

print "start p check"
a =1
do

worda$ =""
wordb$ =""
wordcheck$ =""
abword$ = ""
abchar$ = ""

! thistrick$ =""
! thistrick$= int$(x) +“,“+int$(y)

if lword$[dword] = porword$[a]
if mod (a,2) = 1
worda$= porword$[a]
wordb$ = porword$[a+1]
wordcheck$ = mid$(wordb$, porlf[a+1],100)

por = 2

x = lwordsx[dword] + ((porlf[a]-1) * dx ) 
y = lwordsy[dword] + ((porlf[a]-1) * dy )


print worda$ , "aaaa"
print wordb$ , "bbbb"

print "por2 asia" , wordcheck$
print x,y
gosub traverse_portmanteau

else
worda$ = porword$[a-1]
wordb$= porword$[a]
wordcheck$ = mid$(worda$,1,porlf[a-1])
por =1

x = lwordsx[dword] + ((porlf[a]-1) * dx) 
y = lwordsy[dword] + ((porlf[a]-1) * dy)

print worda$ , "aaaa"
print wordb$ , "bbbb"
print "por1 europe" ,wordcheck$
print x,y
print ((porlf[a]-1) * dx*-1)
print ((porlf[a]-1) * dy*-1)
gosub traverse_portmanteau

end if
end if
a =a+1
until a>6
! extend later

! check if 



return


traverse_portmanteau:

c = 1

do


if por =1

x = x +(1 * dx *-1)
y = y +(1 * dy *-1)

else


x = x +(1 * dx )
y = y +(1 * dy )

end if 


if x<1
x = 8 - x
end if

if x> 8
x = x -8
end if

if y < 1
y= 7 - y
end if

if y > 7
y= y -7
end if

print dx, dy,"……>"
print x,y ,abcharold$[x,y]

if por =1
abchar$=abcharold$[x,y] +abchar$

else
abchar$=abchar$ +abcharold$[x,y] 
end if

c=c+1

until c > len(wordcheck$)


print "@@@"
print worda$, wordb$
print wordcheck$
print abchar$
print x,y
print "@@@@@"

if wordcheck$= abchar$ & ~
abchar$<>""
thistrick$ = thistrick$+ "portmanteau"
! consider re evaluate in score
score = score + len(worda$)+ len(wordb$)

print "portmanteau"
else
thistrick$ = thistrick$+""
print "not port"
end if

if abchar$= ""

print "empty issue"
end if

return


