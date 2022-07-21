<script>
  import LoadingScreen from "$lib/components/LoadingScreen.svelte";
  import { page, session } from "$app/stores";
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabaseClient";
  import StyledButton from "$lib/components/StyledButton.svelte";
  import { activeConversation, discordUser, isInvited, isLoading, isLoadingScreen, lastAccessToken, user, userName } from "$lib/stores/store";
	import { v4 as uuidv4 } from 'uuid';
import { addParticipant, getTwilioAccessToken } from "$lib/services/chat";
import { JoinConversation } from "$lib/services/user";
import { goto } from "$app/navigation";
import { ACTIVE_PAGE } from "$lib/stores/homeStore";
import Header from "$lib/components/Index/Header.svelte";
  let participants;
  let inviteCode;
  let inviteServer = null;
  let isNewUser = false;
  let username = '';
  onMount(async () => {
    inviteCode = $page.params.code
    
    const { data } = await supabase
			.from('servers')
			.select(`id,friendly_name, channels!channels_server_id_fkey(id, server_id,description,friendly_name)`).eq("invite_code", inviteCode);
    if (data?.length > 0) {
      inviteServer = data[0];
      isLoadingScreen.set(false);
    }
  });


  async function handleJoinServer(){
    if(($session !== null || $discordUser?.id !== '' || $user.id !== '') && username !== ''){
      const uid = $discordUser?.id || uuidv4();

      user.update((user) => {
        user.id = uid;
        user.avatar = `https://avatars.dicebear.com/api/open-peeps/${username}.svg`;
        user.username = `Anonymous_${username}`;
        user.email = 'a@a.com';
        user.access_token = `anonymous_Anonymous_${username}`;
        user.servers = [inviteServer];

        return user;
      });
    

      const userData = $user
		fetch('/api/cookie/', {
					method: 'POST',
					body: JSON.stringify(userData)
				})
      const { data, error } = await supabase.from('users').select('id').eq('username', username);
		if (data.length === 0) {
			const { data, error } = await supabase.from('users').insert([
				{
					id: uid,
					username: username
				}
			]);
		}

		const token = $discordUser?.access_token || $user?.access_token;

		let userIdentity;
 
    if (token.startsWith('anonymous')) {
			userIdentity = token.split('anonymous_')[1];
		} else {
			const { data } = await supabase.auth.api.getUser(token);
			userIdentity = data?.user_metadata.full_name;
			userName.set(userIdentity);
		}
    
		await addParticipant({
			identity: userIdentity,
			room: inviteServer.channels[0].id,
			serverSid: inviteServer.channels[0].server_id,
			uid
		});
		const { accessToken, identity } = await getTwilioAccessToken({
			token,
			serverSid: inviteServer.channels[0].server_id
		});
    lastAccessToken.set(accessToken);
		const chatConversation = await JoinConversation({
			room: inviteServer.channels[0].id,
			twilioAccessToken: accessToken,
		});
		if (chatConversation) {
			activeConversation.set(chatConversation);
      isInvited.set(true);
      goto('/home/server/' + inviteServer.friendly_name);
      ACTIVE_PAGE.set(inviteServer.friendly_name);
      isLoadingScreen.set(false)
			isLoading.set(false);
		}
    }else{
      isNewUser = true;
    }
  }
</script>
<svelte:head>
	<title>Invite | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>
<Header />
<div class="grid place-content-center h-full">
{#if $isLoadingScreen}
<LoadingScreen bgColor="bg-gray-500 dark:bg-neutral-800" />
  {:else if isNewUser}
  <div class="grid place-content-center w-full sm:w-96 h-full sm:h-72 p-56 bg-neutral-600 rounded text-white shadow-lg gap-10 text-center">
    <h1>
      How would you like to be known?
    </h1>
    <h2 class="text-3xl">
      {username}
    </h2>
    <input type="text" bind:value={username} class="text-black p-3">
    <StyledButton
			text="Join Server"
			onClick={handleJoinServer}
			type="button"
			className="font-bold text-green-800 bg-green-300 shadow-[0_5px_0_#4ade80] px-5 py-3 rounded-xl text-xl "
			icon={null}
		/>
  </div>
{:else if inviteServer}
  <div class="grid place-content-center w-full sm:w-96 h-full sm:h-72 p-56 bg-neutral-600 rounded text-white shadow-lg gap-10 text-center">
    <h1>
      You've been invited to join
    </h1>
    <h2 class="text-3xl">
      {inviteServer.friendly_name}
    </h2>
    <StyledButton
			text="Join Server"
			onClick={handleJoinServer}
			type="button"
			className="font-bold text-green-800 bg-green-300 shadow-[0_5px_0_#4ade80] px-5 py-3 rounded-xl text-xl "
			icon={null}
		/>
  </div>
  
{/if}
</div>
<footer
	class="grid grid-cols-3 place-content-center text-center p-5 w-full bg-neutral-800 text-white"
>
	<p>LinkedIn</p>
	<p>Made with ❤️ by David Huertas</p>
	<p>Github</p>
</footer>
