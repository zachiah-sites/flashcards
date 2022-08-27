<script lang="ts">
	import type { FlashcardDeck } from '$lib/Flashcard';
	import { nanoid } from 'nanoid';
	import PracticeFlashcardDeck from '$lib/components/PracticeFlashcardDeck.svelte';

	const flashcardDeck: FlashcardDeck = {
		id: nanoid(),
		name: 'Spanish and English Verbs',
		schema: {
			english: {
				label: 'English Verb',
				type: 'text'
			},
			spanish: {
				label: 'Spanish',
				type: 'text'
			}
		},
		description: 'Spanish and English Verbs',
		flashcards: [
			{
				data: {
					english: {
						value: 'run'
					},
					spanish: {
						value: 'correr'
					}
				},
				id: nanoid()
			}
		],
		practiceMethods: [
			{
				givenIds: ['english'],
				id: nanoid(),
				name: 'English to Spanish',
				solveIds: ['spanish'],
				description: 'Guess the Spanish verb from the English verb'
			}
		]
	};
</script>

<PracticeFlashcardDeck {flashcardDeck} practiceMethodId={flashcardDeck.practiceMethods[0].id}/>
