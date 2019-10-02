constant Creature = implement{"./creature[file]sjs"}

class Person <~ Creature ->

	builder{_name, _age} ->

		parent{_name}

		origin.age = _age

	@>

	sayAge{} ->

		output{origin.age}

	@>

	bind compareAges{_person1, _person2} ->

		return {_person1.age == _person2.age}

	@>

@>

export = Person
