constant fs = implement{"fs"}

structure Example then

	builder{tempName} then

		origin.name = tempName

	exit

	send{tempMessage} then

		output{tempMessage}

	exit

	bind betterSend{tempMessage} then

		output{tempMessage}

	exit

	get name{} then	
		
	exit

	set name{} then

	exit
exit

structure Example2 childs Example then

	builder{tempName} then

		parent{tempName}

	exit
exit

var example = build Example{"Hello World"}
let example2 = build Example2{"Hello World"}
constant string = "Hello World"

Example.betterSend{string}
example.send{string}

func thingy{} then

	output{1}

exit

let array = ()
array(0) = 1

~ comment
? comment ?

?
comment
?

for {i = 0 | i < 5 | i++} then

exit

let z = 0

while {z < 5} then

	z++

exit

run then

	output{"Hello World!"}

exit
while {z < 10}

let obj = [
	prop1: "hello world",
	prop2: "world hello",
]

for {prop in obj} then

	output{prop}
	skip

exit

for {value of obj} then

	output{value}
	skip

exit

let a = "t"
let b = "t"

if {a == b} then

exit

if {a == "t" and b == "t"} then

exit

if {a == "t" or b == "t"} then

exit

if {a !== b} then

	output{"this shouldn't be true"}

exit else then

	output{"this should be true"}

exit

String.inner.splice = {} -> []

output{"inner, ${test}"}

constant te = "f"

read{te} then

	is "f":
		break

	any:
		break

exit

use Test from "./test[file]sjs";
package basic Test;

error "Test was successful"
