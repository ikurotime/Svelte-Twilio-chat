<script>

import { FIRST_TAB,SECOND_TAB,selectedTab,userName } from "../../store";
import StyledButton from "../StyledButton.svelte";

</script>
    {#if $selectedTab === FIRST_TAB}
      <p>CHOOSE A CHARACTER AND A NICKNAME</p>
      <div class="flex gap-3">
        <input type="text" bind:value={$userName} class="p-3 rounded text-center"/>
        <StyledButton  onClick={() => {}} type="submit" text="CONFIRM" className="text-slate-800 bg-blue-300 shadow-[0_5px_0_#60a5fa] p-2 h-10 rounded-xl text-sm"/>
      </div>
      {:else if $selectedTab === SECOND_TAB}
      <p>CHOOSE A CHARACTER AND LOG IN</p>
      <p>Only logged-in players can access the lobby</p>
      <div class="flex gap-3 w-full justify-center">
        <button>DISCORD</button>
      </div>
    {/if}
