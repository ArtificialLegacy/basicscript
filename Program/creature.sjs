class Creature ->

	builder{_name} ->

		origin.name = _name

	@>

	sayName{} ->

		output{origin.name}

	@>

	bind compareNames{_creature1, _creature2} ->

		return {_creature1.name == _creature2.name}

	@>

@>

export = Creature
