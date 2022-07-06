<script>
	import logo from '../../images/midulogo.png';
	import UserProfile from './UserProfile.svelte';
</script>

<header
	class="grid grid-cols-3 justify-center gap-3 grid-rows-1 text-center items-center grow-0 bg-neutral-800 p-3 text-white"
>
	<select class="bg-neutral-800 w-fit m-auto" name="lang" id="id_lang">
		<option value="en">EN</option>
		<option value="es">ES</option>
	</select>
	<p>TECHTALKS</p>
	<UserProfile />
</header>
