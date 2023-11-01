export default function decorate(block) {
  const anchor = block.querySelector('a');
  // anchor.remove();
  console.log(block);
  console.log(block.querySelectorAll('div'));

  const [topCallout, videoDiv, bottomCallout] = [...block.children];
  console.log(topCallout);
  console.log(videoDiv);
  console.log(bottomCallout);

  bottomCallout.classList.add('bottom-callout');
  topCallout.classList.add('top-callout');
  videoDiv.classList.add('video');
  
  videoDiv.innerHTML = `<video loop muted playsInline>
      <source data-src="${anchor?.href}" type="video/mp4" />
    </video>`;
  const video = block.querySelector('video');
  const source = block.querySelector('video > source');

  source.src = source.dataset.src;
  video.load();
  video.addEventListener('loadeddata', () => {
    video.setAttribute('autoplay', true);
    video.setAttribute('data-loaded', true);
    video.play();
  });
}
