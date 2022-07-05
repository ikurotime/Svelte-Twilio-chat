<script>
import logo from "../../images/midulogo.png";
import UserProfile from "./UserProfile.svelte";
</script>

<header class="grid grid-cols-3 justify-center mt-3 gap-3 grid-rows-1 text-end items-center">
  <img src={logo} alt="midudev" class="w-36 sm:w-48 m-auto col-start-2"/>
  <UserProfile/>
</header>