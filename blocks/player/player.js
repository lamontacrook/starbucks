/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(element) {
  const codeBasePath = 'https://main--starbucks--lamontacrook.hlx.page';
  const { alt, src } = element.querySelector('img');
  const frame = document.createElement('iframe');
  const configPath = `${window.location.origin}/videos.json`;
  fetch(configPath).then((res) => {
    res.json().then((json) => {
      json?.data.forEach(({ block, video, poster }) => {
        if (block === 'player' && alt && alt.includes(poster)) {
          const { search, origin, pathname } = new URL(video);
          if (src.includes('localhost')) src.replace('http://localhost:3000', codeBasePath);
          const newSearch = [];
          search.split('&').forEach((elem) => {
            const [key] = elem.split('=');
            if (key === 'posterimage') newSearch.push(`${key}=${src}`);
            else newSearch.push(elem);
          });
          frame.setAttribute('src', `${origin}${pathname}${newSearch.join('&')}`);
        }
      });
    });
  });
  element.querySelector('div').replaceWith(frame);
}
