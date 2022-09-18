import './globals';
import '../assets/css/main.css';

const myPage = html` <div>Here's my main page.</div> `;

const myListView = html`<p class="text-blue-600">The quick brown fox...</p>`;

const myPage2 = html` ${myPage} ${myListView} `;

const program = Do(($) => {
  $(render(document.body, html` ${myPage2}`));
});

program.unsafeRunPromise();
