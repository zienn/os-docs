<script setup>
import { useSlots } from 'vue';
const [word] = useSlots().default()

async function pronunciation(){
  if(word && word.children){

  }
}
function play1(){
  if(word && word.children){
    play(word,1)
  } 
}
function play2(){
  if(word && word.children){
    play(word,2)
  } 
}
function play(word,type){
  const url = `https://dict.youdao.com/dictvoice?audio=${word.children}&type=${type}`
  const audio = new Audio(url)
  // audio.addEventListener
  audio.play()
}
</script>

<template>
  <div class="it-words" @click="pronunciation">
    <slot></slot>
    <span class="tip" @click="play1()">英</span>
    <span class="tip" @click="play2()">美</span>
  </div>
</template>
<style scoped>
.it-words{
  cursor: pointer;
  color:var(--vp-c-brand);
}

.tip{
    color: var(--vp-badge-tip-text);
    display: inline-block;
    margin-left: 5px;
    border: 1px solid var(--vp-c-brand);
    border-radius: 10px;
    padding: 0 8px;
    line-height: 18px;
    font-size: 12px;
    font-weight: 600;
    transform: translateY(-2px);
}
</style>