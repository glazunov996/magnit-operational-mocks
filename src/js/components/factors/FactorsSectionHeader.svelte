<script>
  import { getUIState } from 'state/ui';
  import FactorsTotalFact from 'components/factorsTotal/fact/FactorsTotalFact.svelte';
  import FactorsTotalBudget from 'components/factorsTotal/budget/FactorsTotalBudget.svelte';

  export let data;
  export let baseRatios;
  export let minRatios;
  export let indicator;

  const sectionScrollX = getUIState('sectionScrollX');

  let node;

  $: updateScroll($sectionScrollX);
  $: console.log("RESULTS", data)

  function updateScroll() {
    if (node) node.scrollLeft = $sectionScrollX;
  }
</script>

<div
  bind:this={node}
  class="txcm-factorsSectionHeader">
    {#if indicator.id != '20'}
      <FactorsTotalFact
        {data} 
        {baseRatios}
        {minRatios}
        {indicator}
      />
    {/if}
</div>
