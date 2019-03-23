?
	Note: This file is just an example of the syntax. If you try and run the compiled js file it will throw errors.	
?

constant Discord = implement{"discord.js"}

structure Example ->

	builder{tempName} ->

		origin.name = tempName

	@>

	send{tempMessage} ->

		output{tempMessage}

	@>

	bind betterSend{tempMessage} ->

		output{tempMessage}

	@>

	get name{} ->
		
	@>

	set name{} ->

	@>
@>

structure Example2 childs Example ->

	builder{tempName} ->

		parent{tempName}

	@>
@>

var example = build Example{"Hello World"}
let example2 = build Example2{"Hello World"}
constant string = "Hello World"

Example.betterSend{string}
example.send{string}

func thingy{} ->

	output{1}

@>

let array = ()
array(0) = 1

~ comment
? comment ?

?
comment
?

for {i = 0 & i < 5 & i++} ->

@>

let z = 0

while {z < 5} ->

	z++

@>

run ->

	output{"Hello World!"}

@>
while {z < 10}

let obj = [
	prop1: "hello world",
	prop2: "world hello",
]

for {prop in obj} ->

	output{prop}
	skip

@>

for {value of obj} ->

	output{value}
	skip

@>

let a = "t"
let b = "t"

if {a == b} ->

@>

if {a == "t" and b == "t"} ->

@>

if {a == "t" or b == "t"} ->

@>

if {a !== b} ->

	output{"this shouldn't be true"}

@> else ->

	output{"this should be true"}

@>

String.inner.splice = {} >> []

output{"inner, ${test}"}

constant te = "f"

read{te} ->

	is "f":
		
	break

	any:
		
	break

@>

use Test from "./test[file]sjs";
package basic Test;

error "Test was successful"
