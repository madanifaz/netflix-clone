<div
	class="group text-center h-full flex items-center align-center flex-col py-6 relative cursor-pointer"
>
	<slot name="title">Button</slot>

	<div class="hidden group-hover:inline-block w-12 overflow-hidden  absolute top-8 mt-2">
		<div class=" h-8 w-8 bg-background rotate-45 transform origin-bottom-left" />
	</div>
	<div class="hidden group-hover:block hover:block absolute top-16">
		<slot name="items" />
	</div>
</div>
