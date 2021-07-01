<CsoundSynthesizer>

<CsOptions>

-o scratch.wav -W

</CsOptions>

<CsInstruments>

sr = 44100
ksmps = 1
nchnls = 1

instr 1
;			init	dur	fin...
	kenv	linseg	1,	p3,	0
	kpch	linseg	1,	p3,	1/2
;			amp		pitch		table
	asig	oscil	14000*kenv,	440*p4*kpch,	1
		out	asig
endin

instr 2
;			init	dur	fin...
	kenv	linseg	0,	0.01,	1,	p3 - 0.01,	0
	kpch	linseg	1,	p3,	1/2
;			amp		pitch		table
	asig	oscil	14000*kenv,	440*p4*kpch,	1
		out	asig
endin

</CsInstruments>

<CsScore>

; triangle wave
;	table	when	size	gen	init	dur	fin...
f	1	0	8192	7	0	2048	1	4096	-1	2048	0

; set tempo
t	0	240

;	instr	start	dur	pitch
i	1	0	[1/4]	[1/4]
i	2	[1/8]	[1/4]	[1/4*8/9]
i	2	[2/8]	[1/4]	[1/4*(8/9)^2]
e

</CsScore>

</CsoundSynthesizer>
