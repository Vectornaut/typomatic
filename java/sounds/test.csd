<CsoundSynthesizer>

<CsOptions>

-o test.wav -W

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 1
nchnls = 1

instr 1
;			init	dur	fin...
	kenv	linseg	1,	p3,	0
	kpch	linseg	1,	p3,	1/2
	asig	oscil	14000*kenv,	440*p4*kpch,	1
	outs	asig
endin

instr 2
;			init	dur	fin...
	kenv	linseg	0,	0.01,	1,	p3-0.01,	0
	kpch	linseg	1,	p3,	1/2
	asig	oscil	14000*kenv,	440*p4*kpch,	1
	outs	asig
endin

</CsInstruments>

<CsScore>

; trapezoid wave
;	table	when	size	gen	init	dur	fin...
;f	1	0	8192	10	1
;f	1	0	8192	7	0	2048	1	4096	-1	2048	0
f	1	0	8192	7	0	256	1	3584	1	512	-1	3584	-1	256	0

; set tempo
t	0	240

;	instr	start	dur	pitch
i	1	0	[8/32]	[1/4]
i	2	0.125	[8/32]	[0.9/4]
i	2	0.25	[8/32]	[0.81/4]
e

</CsScore>

</CsoundSynthesizer>
