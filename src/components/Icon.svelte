<script lang="ts">
  import 'bootstrap-icons/font/bootstrap-icons.min.css';
  import type { ComponentWithIcon } from '@/types';

  export let name: ComponentWithIcon['iconName'];
  export let classes = '';
</script>

<i class="bi bi-{name} m-0 {classes}">
  <slot />
</i>
