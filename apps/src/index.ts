import './globals';

const myPage = html` <div>Here's my main page.</div> `;

const myListView = html`<div>Here's my main page4.</div>`;

const myPage2 = html` ${myPage} ${myListView} `;

const program = Do(($) => {
  $(render(document.body, html` ${myPage2}`));
});

program.unsafeRunPromise();
