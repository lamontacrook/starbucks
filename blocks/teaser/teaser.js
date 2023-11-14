import { addVideoLightbox } from '../../scripts/scripts.js';

function getVideo() {
  const configPath = `${window.location.origin}/videos.json`;
  return fetch(configPath).then((res) => res.json().then((json) => json));
}

export default function decorate(element) {
  const codeBasePath = 'https://main--starbucks--lamontacrook.hlx.page';
  const cols = [...element.firstElementChild.children];
  element.classList.add(`columns-${cols.length}-cols`);
  let videoSrc = '';
  // setup image columns
  [...element.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const { alt, src } = pic.querySelector('img');

        getVideo().then((json) => {
          json?.data.forEach(({ block, video, poster }) => {
            if (block === 'columns' && alt === poster) {
              const { search, origin, pathname } = new URL(video);
              if (src.includes('localhost')) src.replace('http://localhost:3000', codeBasePath);
              const newSearch = [];
              search.split('&').forEach((elem) => {
                const [key] = elem.split('=');
                if (key === 'posterimage') newSearch.push(`${key}=${src}`);
                else newSearch.push(elem);
              });
              videoSrc = `${origin}${pathname}${newSearch.join('&')}`;
            }
          });
        });
      }

      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }

        if (element.classList.contains('video')) {
          pic.parentElement.innerHTML += '<a href="" class="play-button"><img data-icon-name="play-button" src="/icons/play-button.svg" loading="lazy"></a>';
          const anchor = element.querySelector('.play-button');
          anchor.addEventListener('click', ((e) => {
            e.preventDefault();
            addVideoLightbox(element, videoSrc);
          }));
        }
      }
    });
  });
}
