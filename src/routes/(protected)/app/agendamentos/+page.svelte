<script>
	import { Calendar, TimeGrid } from '@event-calendar/core';

	let options = $state({
		view: 'timeGridWeek',
		events: [
			// your list of events
		]
	});
</script>

<div class="card p-4">
	<Calendar plugins={[TimeGrid]} {options} />
</div>
