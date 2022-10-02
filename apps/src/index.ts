//import './globals.ts';
import './index.css';
//import '@effect/html/global';
import type {} from '@effect/html/global';

const myPage = html` <div>Here's my main page3.</div> `;

const myListView = html` <input class="border-2 border-rose-600 ..." />`;

const myPage2 = html` ${myPage} ${myListView} `;

const program = Do(($) => {
  $(render(document.body, html` ${myPage2}`));
});

program.unsafeRunPromise();
