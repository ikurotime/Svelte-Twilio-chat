<script>
import ChannelBlock from "./ChannelBlock.svelte";
import Dropdown from "./Dropdown.svelte";


  const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];
</script>

<div class='channel-bar shadow-lg'>
  <ChannelBlock />
  <div class='channel-container'>
    <Dropdown header='Topics' selections={topics} />
    <Dropdown header='Questions' selections={questions} />
    <Dropdown header='Random' selections={random} />
  </div>
</div>