/**
 * A deck of flashcards.
 */
export type FlashcardDeck = {
	/**
	 * The ID of the deck.
	 */
	id: string;
	/**
	 * The name of the deck.
	 * @example "Spanish Verbs"
	 */
	name: string;
	/**
	 * The description of the deck.
	 * @example "Convert English verbs to Spanish"
	 * @optional
	 */
	description?: string;
	/**
	 * The Flashcards in the deck.
	 */
	flashcards: Flashcard[];
	/**
	 * The schema for flashcards in the deck.
	 */
	schema: FlashcardSchema;
	/**
	 * The Available PracticeMethods for the deck
	 */
	practiceMethods: PracticeMethod[];
};

/**
 * A flashcard.
 * A flashcard has to be associated with a deck.
 * A flashcard without a deck is meaningless.
 */
export type Flashcard = {
	/**
	 * The ID of the flashcard.
	 */
	id: string;
	/**
	 * The data of the flashcard.
	 * This should match the schema of the flashcard's deck.
	 */
	data: FlashcardData;
};

/**
 * An Item in a flashcard schema
 */
export type FlashcardSchemaItem = {
	/**
	 * The type of the data
	 * text is for strings
	 * number is for numbers
	 * checkbox is for boolean values
	 * select is for a list of options
	 * imageSelect is for a list of images
	 */
	type: 'text' | 'number' | 'checkbox' | 'select' | 'imageSelect';
	/**
	 * The label of the item
	 * @example "Spanish Word"
	 */
	label: string;
	/**
	 * For select and imageSelect, the options for the select
	 */
	options?: string[];
};

/**
 * An Item in flashcard data
 */
export type FlashcardDataItem = string | number | boolean | string[];

/**
 * Flashcard data
 */
export type FlashcardData = Record<
	/** The Id */
	string,
	/** The data */
	FlashcardDataItem
>;

/**
 * A practice method for a flashcard deck.
 * A practice method is a way to practice a flashcard deck.
 * A practice method has to be associated with a flashcard deck.
 * A practice method without a flashcard deck is meaningless.
 */
export type PracticeMethod = {
	/**
	 * The ID of the practice method.
	 */
	id: string;
	/**
	 * The name of the practice method.
	 */
	name: string;
	/**
	 * The description of the practice method.
	 */
	description?: string;
	/**
	 * The Ids the user will have to solve to get the flashcard "right"
	 */
	solveIds: string[];
	/**
	 * The Ids the user will be given by which they can solve the flashcard
	 */
	givenIds: string[];
};

/**
 * The schema for a flashcard deck.
 * A schema is a way to define the data of a flashcard deck.
 */
export type FlashcardSchema = Record<string, FlashcardSchemaItem>;
