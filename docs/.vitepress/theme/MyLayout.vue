<script setup lang="ts">
import { useData,useRoute,useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme'
const data = useData()
const route = useRoute()
const router = useRouter()
console.log(data,route,router)
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- <template #aside-outline-before> -->
      <!-- My custom sidebar top content -->
    <!-- </template> -->


    <template #aside-top><slot name="aside-top" />1</template>
      <template #aside-bottom><slot name="aside-bottom" />2</template>
      <template #aside-outline-before><slot name="aside-outline-before" />3</template>
      <template #aside-outline-after><slot name="aside-outline-after" />4</template>
      <template #aside-ads-before><slot name="aside-ads-before" />5</template>
      <template #aside-ads-after><slot name="aside-ads-after" />6</template>
  </Layout>
</template>

<!-- 
<template>
  <div v-if="frontmatter.layout !== false" class="Layout">
    <slot name="layout-top" />
    <VPSkipLink />
    <VPBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <VPNav>
      <template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
      <template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
      <template #nav-bar-content-before><slot name="nav-bar-content-before" /></template>
      <template #nav-bar-content-after><slot name="nav-bar-content-after" /></template>
      <template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
      <template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>
    </VPNav>
    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="isSidebarOpen" />

    <VPContent>
      <template #home-hero-before><slot name="home-hero-before" /></template>
      <template #home-hero-after><slot name="home-hero-after" /></template>
      <template #home-features-before><slot name="home-features-before" /></template>
      <template #home-features-after><slot name="home-features-after" /></template>

      <template #doc-footer-before><slot name="doc-footer-before" /></template>
      <template #doc-before><slot name="doc-before" /></template>
      <template #doc-after><slot name="doc-after" /></template>

      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
      <template #aside-outline-before><slot name="aside-outline-before" /></template>
      <template #aside-outline-after><slot name="aside-outline-after" /></template>
      <template #aside-ads-before><slot name="aside-ads-before" /></template>
      <template #aside-ads-after><slot name="aside-ads-after" /></template>
    </VPContent>

    <VPFooter />
    <slot name="layout-bottom" />
  </div>
  <Content v-else />
</template> -->
