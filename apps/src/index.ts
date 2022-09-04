import './globals';

const program = Do(($) => {
  $(render(document.body, html`${'test'}`));
});

program.unsafeRunPromise();
