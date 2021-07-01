; This sound is based on Ben Anderson's 8BitSFX, which was released under the
; Creative Commons Attribution 3.0 Unported license.
;
; 8BitSFX can be found on Freesound with sound ID 110930
; Ben Anderson can be found at http://www.redlabaudio.com

<CsoundSynthesizer>

<CsOptions>

-o bling.wav -W

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 1
nchnls = 1

instr 1
;			init	dur	fin...
	kenv	linseg	1,	p3,	0.25
;			amp		pitch	table
	asig	oscil	3000*kenv,	440*p4,	1
		out	asig
endin

instr 2
;			init	dur	fin...
	kenv	linseg	0,	0.01,	0.75,	p3 - 0.01,	0
;			amp		pitch	table
	asig	oscil	3000*kenv,	440*p4,	1
		out	asig
endin

</CsInstruments>

<CsScore>

; trapezoid wave
;	table	when	size	gen	init	dur	fin...
f	1	0	8192	7	0	256	1	3584	1	512	-1	3584	-1	256	0

; set tempo
t	0	240

;	instr	start	dur	pitch
i	1	0	[5/32]	1
i	2	[3/16]	[13/16]	[3/2]
e

</CsScore>

</CsoundSynthesizer>
