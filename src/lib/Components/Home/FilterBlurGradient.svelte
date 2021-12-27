<!--
@component
Components to add Filter Blur to element as workaround for firefox that not support blur
Must Used on container with relative or fixed display.
- Usage:
  ```tsx
  <div class="relative">
    <FilterGradient/>
</div>
```
-->

<div class="absolute top-0 left-0 h-full w-full blur-[5px] backdrop-blur-[5px] z-10" />

<style>
	div {
		background: linear-gradient(180deg, rgba(15, 22, 29, 0.56) 0%, rgba(15, 22, 29, 0) 100%);
	}
</style>
