<script>
	export let radius = '';
	export let sizing = 'h-full w-full';
</script>

<!--
@component
Components to add Filter gradient to element
Must Used on container with relative or fixed display.
- Usage:
  ```tsx
    <div class="relative">
        <FilterGradient/>
    </div>
    ```
  -->

<div class="absolute top-0 left-0 {sizing} {radius}" />

<style>
	div {
		background: linear-gradient(180deg, rgba(15, 22, 29, 0.29) 0%, #0f161d 100%);
	}
</style>
