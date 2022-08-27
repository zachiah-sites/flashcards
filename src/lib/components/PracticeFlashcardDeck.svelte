<script lang="ts">
	import type { FlashcardDeck } from '$lib/Flashcard';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let flashcardDeck: FlashcardDeck;
	export let practiceMethodId: string;

	let activeIndex = 0;

	$: activeFlashcard = flashcardDeck.flashcards[activeIndex];
	$: practiceMethod = flashcardDeck.practiceMethods.find((i) => i.id === practiceMethodId)!;

	let userData: Record<string, any> = {};

	let reviewing = false;

	$: finished = activeIndex >= flashcardDeck.flashcards.length;

	let correct = 0;

	$: percentage = Math.round((correct / flashcardDeck.flashcards.length) * 100);
</script>

<form
	class="p-2 bg-white shadow-md m-8 rounded-lg"
	on:submit|preventDefault={() => {
		if (finished) {
			dispatch('finished', percentage);
			return;
		}

		if (reviewing) {
			reviewing = false;
			activeIndex++;
			userData = {};
			return;
		}

		reviewing = true;
		const valid = practiceMethod.solveIds.every(
			(solveId) => activeFlashcard.data[solveId].value === userData[solveId]
		);

		if (valid) {
			correct++;
		}
	}}
>
	{#if finished}
		You scored {percentage}%
	{:else}
		<h1 class="text-lg border-b-1 mb-2">{practiceMethod.description}</h1>

		{#each practiceMethod.givenIds as givenId}
			{@const schema = flashcardDeck.schema[givenId]}

			<p class="p-2 block">
				{schema.label}:
				{activeFlashcard.data[givenId].value}
			</p>
		{/each}

		<div class="flex flex-col gap-2 py-2">
			{#each practiceMethod.solveIds as solvedId}
				{@const schema = flashcardDeck.schema[solvedId]}
				{@const valid = userData[solvedId] === activeFlashcard.data[solvedId].value}

				<label
					class="p-2 block"
					class:bg-green-200={reviewing && valid}
					class:bg-red-200={reviewing && !valid}
				>
					<p>
						{schema.label}
						{#if reviewing}
							- {activeFlashcard.data[solvedId].value}
						{/if}
					</p>
					<input
						class="border-2"
						class:bg-gray-200={reviewing}
						readonly={reviewing}
						bind:value={userData[solvedId]}
					/>
				</label>
			{/each}
		</div>
	{/if}

	<div>
		<button class="p-2 bg-green-500 hover:bg-green-600" type="submit">
			{#if finished}
				Go Back
			{:else if reviewing}
				Continue
			{:else}
				Check
			{/if}
		</button>
	</div>
</form>

<!-- 
1. automatically focus the first form input
2. style the button better
3. style the form field better
 -->
