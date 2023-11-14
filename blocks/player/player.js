/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(element) {
  const codeBasePath = 'https://main--starbucks--lamontacrook.hlx.page';
  const { alt, src } = element.querySelector('img');
  const configPath = `${window.location.origin}/videos.json`;
  fetch(configPath).then((res) => {
    res.json().then((json) => {
      json?.data.forEach(({ block, video, poster }) => {
        if (block === 'player' && alt && alt.includes(poster)) {
          const { search } = new URL(video);
          if (src.includes('localhost')) src.replace('http://localhost:3000', codeBasePath);
          const params = {};
          search.split('&').forEach((elem) => {
            const [key, val] = elem.split('=');
            params[key.replace('?', '')] = val;
          });
          const frame = document.createElement('div');
          frame.setAttribute('id', 's7viewer');
          frame.setAttribute('style', 'position:relative;height: 396px;width: 710px;');
          element.querySelector('div').replaceWith(frame);
          new s7viewers.VideoViewer({ // eslint-disable-line no-undef
            containerId: 's7viewer',
            params: {
              asset: params?.asset,
              serverurl: params?.serverUrl,
              videoserverurl: params?.contenturl,
              posterimage: src,
            },
          }).init();
        }
      });
    });
  });
}
