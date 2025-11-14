<script lang="ts">
    import { puppiz_url } from "$lib/consts";

</script>

<section id="graphs">
</section>

<style>
#graphs {
	color: whitesmoke;
	font-family: sans-serif;
	height: 50%;
	width: 50%;
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: hsla(0, 0%, 20%, 97%);
	display: flex;
	align-items: center;
	gap: 3%;
	padding-left: 1%;
	box-sizing: border-box;
}
@media (max-width: 600px) {
	#graphs {
		height: unset;
		width: 100%;
		position: static;
	}
}
</style>
