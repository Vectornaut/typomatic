<CsoundSynthesizer>

<CsOptions>

-o sparkle.wav -W

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 1
nchnls = 1

instr 1
;			init	dur	fin...
	kenv	linseg	0,	0.01,	1,	p3 - 0.01,	0
;			amp			pitch	table
	asig	oscil	3000*(1-p5)*kenv,	440*p4,	1
		out	asig
endin

</CsInstruments>

<CsScore>

; trapezoid wave
;	table	when	size	gen	init	dur	fin...
f	1	0	8192	7	0	256	1	3584	1	512	-1	3584	-1	256	0

; set tempo
t	0	240

;	instr	start		dur	pitch		soft
i	1	0		[1/4]	[2*3/5]		[7/8]
i	1	[1/8]		[1/4]	[3*3/5]		[1/8]
{ 3 n
i	1	[(2*$n+2)/8]	[1/4]	[(2*$n+4)*2/5]	[2*$n/8]
i	1	[(2*$n+3)/8]	[1/4]	[(2*$n+5)*2/5]	[(2*$n+1)/8]
}
e

</CsScore>

</CsoundSynthesizer>
