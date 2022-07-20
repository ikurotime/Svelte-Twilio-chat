<script>
import { session } from '$app/stores';

	import { colorNames, userName } from '$lib/stores/store';

	export let message, newUser;
	let userOrigin =
	message.author === $userName ? ' ' : 'text-start ';
	let randomColor = $colorNames[message.author.length];
	function setHour(){
		let hour = message.state.timestamp.toLocaleTimeString();
				if(hour.substring(0,2) > 12){
					hour = hour.substring(0,5) + ' PM';
				}else{
					hour = hour.substring(0,5) + ' AM';
				}
				return hour;
	}
	function setDate(){
		let today = new Date();
		let yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);

		if(today.toDateString() === message.state.timestamp.toDateString()){
			let today = message.state.timestamp.toLocaleTimeString();
			if(today.substring(0,2) > 12){
				today = today.substring(0,5) + ' PM';
			}else{
				today = today.substring(0,5) + ' AM';
			}
			return "Today at " + today;
		}else if(yesterday.toDateString() === message.state.timestamp.toDateString()){
			let yesterd = message.state.timestamp.toLocaleTimeString();
				if(yesterd.substring(0,2) > 12){
					yesterd = yesterd.substring(0,5) + ' PM';
				}else{
					yesterd = yesterd.substring(0,5) + ' AM';
				}
				return "Yesterday at " + yesterd;
		}else{
			return message.state.timestamp.toLocaleDateString();
		}
	}
</script>

<div class={`flex items-center gap-3 p-0.5 w-full  ${userOrigin} rounded px-3 hover:bg-neutral-600 group`}>
	{#if newUser }
	<img src={ message.author === $userName ?$session?.user_metadata?.avatar_url : `https://avatars.dicebear.com/api/open-peeps/${message.author}.svg`} class="w-10 h-10 rounded-full bg-white my-2" alt={$session?.user_metadata?.full_name} />
	{/if}
	<div>
		{#if newUser}
		<small class={`text-sm ${randomColor}`}>{message.author} </small> <small class="text-[10px] text-gray-400">{setDate()}</small>
	{/if}
	<div class="flex gap-3 items-center">
		{#if !newUser}
	
		<p class="opacity-0 text-white text-[10px] -m-1 group-hover:opacity-100">
			{setHour()}
		</p>
		
		{/if}
		<p class={`text-sm p-0 text-white ${newUser ? '' : 'ml-0'} whitespace-pre-line`} >
			{message.body}
		</p>
	</div>
	</div>
</div>
