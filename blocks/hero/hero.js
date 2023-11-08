export default function decorate(element) {
  const picture = element.querySelector('picture');
  const [topCallout, assetDiv, bottomCallout] = [...element.children];
  const { alt } = picture.querySelector('img');

  bottomCallout.classList.add('bottom-callout');
  topCallout.classList.add('top-callout');
  assetDiv.classList.add('asset');
  if (element.classList.contains('video')) {
    const configPath = `${window.location.origin}/videos.json`;
    fetch(configPath).then((res) => {
      res.json().then((json) => {
        json?.data.forEach(({ block, video, poster }) => {
          if (block === 'hero' && alt.includes(poster)) {
            assetDiv.innerHTML = `<video loop muted playsInline>
                <source data-src="${video}" type="video/mp4" />
              </video>`;
            const vdo = assetDiv.querySelector('video');
            const source = assetDiv.querySelector('video > source');

            source.src = source.dataset.src;
            vdo.load();
            vdo.addEventListener('loadeddata', () => {
              vdo.setAttribute('autoplay', true);
              vdo.setAttribute('data-loaded', true);
              vdo.play();
            });
          }
        });
      });
    });
  }
}
