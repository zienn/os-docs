function getContainer(root) {
  root ||= document.body;
  if (!root.innerText) return null;
  const totalWords = root.innerText.match(/\S+/g).length;
  let ps = root.querySelectorAll('p');
  if (!ps.length) ps = root.querySelectorAll('div');
  if (!ps.length) return null;

  let container = null;
  let maxWords = 0;
  for (let p of ps) {
    const numWords = p.innerText.trim().length;
    if (numWords > maxWords) {
      maxWords = numWords;
      container = p;
    }
  }
  let selectedWords = maxWords;
  while (selectedWords / totalWords < 0.5 && container !== root) {
    container = container.parentElement;
    selectedWords = container.innerText.match(/\S+/g).length;
  }

  if (container.tagName === 'P') {
    container = container.parentElement;
  }

  return container;
}
// setTimeout(()=>{
//   let a = getContainer()
//   console.log(a)
// },2000)
