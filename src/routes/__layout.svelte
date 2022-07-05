<script>
import Header from "../components/Index/Header.svelte";
  import "../app.css";
</script>

<main class="h-screen flex justify-center items-center">
  <div class="border-4 mx-3 border-slate-300 rounded-lg h-full max-w-7xl max-h-[80vh] p-3 w-full">  
    <Header/>
    <slot />
  </div>
</main>