constant Person = implement{"./person[file]sjs"}

class Main ->

	bind main{} ->

		let person = build Person{"Bob", 20}
		person.sayName{}
		person.sayAge{}

		output.empty

		let person2 = build Person{"AntiBob", 20}
		person2.sayName{}
		person2.sayAge{}

		output.empty

		let namesEqual = Person.compareNames{person, person2}

		output{namesEqual}

		let agesEqual = Person.compareAges{person, person2}

		output{agesEqual}

		output{namesEqual or agesEqual}

	@>

@>

export = Main;
