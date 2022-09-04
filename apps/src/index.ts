import './globals';

const program = Do(($) => {
  $(
    render(
      document.body,
      html`this is a ${Many.from([1, 2].map((n) => svg`${n}`))} test`
    )
  );
});

program.unsafeRunPromise();
