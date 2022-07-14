<script>
// @ts-nocheck

import ChannelBar from "$lib/components/ChannelBar/ChannelBar.svelte";
import ChannelBlock from "$lib/components/ChannelBar/ChannelBlock.svelte";
import JoinRoom from "$lib/components/Index/JoinRoom.svelte";
import { session } from '$app/stores'
export let userData;
</script>

<svelte:head>
	<title>Home | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<ChannelBar>
    <ChannelBlock text="Home"/>
    <div class='channel-container'>
      
    </div>
    <div class="flex items-center gap-3 text-white mt-auto px-5 py-3 border-t-2 border-slate-900">
      <img src={$session?.user_metadata?.avatar_url} class="w-8 h-8 rounded-full" alt={$session?.user_metadata?.full_name}>
      {$session?.user_metadata?.full_name}
    </div>
 </ChannelBar>

<JoinRoom userData={userData}/>