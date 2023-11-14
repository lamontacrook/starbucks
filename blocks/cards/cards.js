export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
  const nextButton = document.createElement('button');
  nextButton.setAttribute('aria-label', 'Next page');
  nextButton.classList.add('next', 'paddle');

  const previousButton = document.createElement('button');
  previousButton.setAttribute('aria-label', 'Previous page');
  previousButton.classList.add('previous', 'paddle');
  block.append(nextButton);
  block.append(previousButton);
}
